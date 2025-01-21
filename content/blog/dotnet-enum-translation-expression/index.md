---
title: "Translating Enums with the power of C# expressions"
created: 2025-01-20
date: 2025-01-21
tags:
  - csharp
  - dotnet
  - efcore
  - automapper
  - localization
permalink: 2025-dotnet-enum-translation-expression
---


Hi 👋 welcome to a new post!

As a wise man said (forgot the name), "Frustration is the mother of innovation".

For one of my projects at work, I needed to query and sort some tables. The requirement was to let the user filter and sort the data on any field.

What I didn't expect was that some fields were `enum` values under the hood.... how should I filter/sort these values, when the user searches using their text representation (and, even more difficult, translated in their language)?

In this post, I will show how I solved this issue with a nice, little utility function. Since our projects are in .NET, the solution leverages EF Core, Automapper and the power of C# Expression trees.

Let's start!

## What we are trying to do

Let's start with an example. This is the entity we're going to query:

```csharp
public enum Status {
	Created,
	PaymentSuccessful,
	PaymentFailed,
	Shipped,
	Delivered
}

public class Order {
	public int Id { get; set; }
	
	// ... other fields
	
	public Status CurrentStatus { get; set; }
}
```

Our goal is to present the user with a list of the orders in the system. The user wants to search the list using a generic query (e.g. an input text) and sort the values based on their **text representation**. Yes, also for our `Status` field!

This is a nightmare if the application is translated into multiple languages. Our application will have to filter the records not based on the enum's description, but on its translation.

For example, the user might type "Shi" and we should return only the orders with status `Shipped` if he speaks english. In other languages, the status will have a different translation (e.g. in italian it will be "Spedito¨) which doesn´t match with the query.

When dealing with localization, the first option we have is to deal with it on the frontend. We create some json files with the correct translations and apply them to the UI. While this could be an option to visualize the data, it becomes more difficult when querying it.

Another option would be to select the correct value on the frontend using the translated text, then sen its original (numeric) representation to the backend.

In our case, we'd like to search on multiple fields, which makes this approach more complex. Also, I wanted to expose a standard interface to the frontend (see below), so we'll see the backend-only solution!

Here's the endpoint I came up with. It's implemented using *.NET 8 Minimal APIs* and *Entity Framework Core*. I also used [Gridify](https://alirezanet.github.io/Gridify/) to *automagically* apply filtering, sorting and paging to the data.

```csharp
app.MapGet(  
        "/orders",  
        async (  
            [AsParameters] GridifyQuery gridifyQuery,  
            AppDbContext dbContext,  
            IMapper mapper,  
            CancellationToken cancellationToken  
        ) =>  
        {  
            var ordersQuery = dbContext.Orders
		        .ProjectTo<OrderDto>(mapper.ConfigurationProvider);  
  
            var count = await ordersQuery
		        .ApplyFiltering(gridifyQuery).CountAsync();  
		            
            var data = await ordersQuery  
                .ApplyFilteringOrderingPaging(gridifyQuery)  
                .ToListAsync(cancellationToken);  
            return new Paging<OrderDto>(count, data);  
        }
    ).WithName("GetOrders");
```

First, we get the data inside the Orders table and project it to the final response type. I do this before performing the search/sort to filter based on what the user can see (e.g. our localized enum description, we'll see later).

Then, we use gridify to apply the paging/filtering/sorting to our query and return the data and the total count (so that the frontend can use it to display a list or table).

Seems simple, right? It is! However, if I try to search for some enum values (this can be done by sending a gridify query such as `'status = Created'`) I get a nasty error from the ORM, saying it cannot translate our code to a SQL query.

Why does this happen, and how can we fix that?

## How automapper queryable extensions work

Automapper is an object-to-object mapper. It allows to define custom profiles to map any type of object to any other type. In our case, we use automapper to project the entity to the response we want the API to return. 

We do this by using automapper's [Queryable extensions](https://docs.automapper.org/en/stable/Queryable-Extensions.html). Queryable extensions allow to call the `ProjectTo` method on a LINQ query. Automapper adds a custom `SELECT` statement to our query, with the minimum set of fields needed for the mapping to occur. This optimization improves performance by passing less data from the DBMS to the application and also makes our code more readable.

#### Mapping profile

To make automapper work, we need to define a mapping profile for our objects. Usually, automapper maps fields with the same name and type in both objects, making it easier to map simple objects with less code. For more complex mappings, we can provide a custom profile using some configuration methods. 

For each complex field we want to map, we provide an `Expression` that maps that field from the source object. This expression can be simple (e.g. accessing a source field) or more complex (e.g. making operations on top, with conditionals and other procedures).

This is an example of a complex mapping, in which we map the total price of our order to the sum of the prices of each item: 

```csharp
CreateMap<Order, OrderDto>()
	.ForMember(
		dst => dst.TotalPrice,
		opt.MapFrom(
			src => src.Items.Select(o => o.Price * o.Quantity).Sum()
		)
	);
```

The parameter we pass to the `MapFrom` method is a lambda, which is interpreted by the C# SDK as an [Expression Tree](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/expression-trees/).

Let´s see what are C# expressions, and how they are used.

### What are C# `Expression` trees?

We just saw that automapper uses expressions to map fields between objects. But what are expressions in C#? Here is a short section to describe what is a C# `Expression` and how they are used in some libraries. To know more about expressions, see the [documentation](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/expression-trees/)

In layman's terms, an expression tree is a data structure (a tree) which stores a piece of code. In C#, we can define an expression starting from a lambda (such as `Func<>`). The compiler will parse the code inside our lambda and return the corresponding syntax tree. 

Here is an example of how a lambda is expressed using an expression tree:

```csharp
Expression<Func<int, int>> lambda = n => n + 1;

// Same as writing

var parameter = Expression.Parameter(typeof(int), "n");  
var constant = Expression.Constant(1);  
var addition = Expression.Add(parameter, constant);
var lambda = Expression.Lambda<Func<int, int>>(addition, parameter);
```

What are expressions used for? The most common use case is in ORM frameworks. For example, Entity Framework can transform a chain of LINQ calls into SQL queries because each operation can be represented with an Expression.

For example, in this code

```csharp
dbContext.Set<Order>().Where(o => o.Id == 3).ToList()
```

The `o => o.Id == 3` is an expression. After creating the underlying `IQueryable`, EF will traverse the expression tree to optimize it and translate it to SQL. Cool!

Another example is automapper itself. A mapping profile can be created using expressions, to indicate how a given field should be mapped from the source object. When the profile is created, the expression is then used to map the given types. And that's what we are going to use for our use case!

### How resource files work in .NET

Let's take a small detour from automapper and its magic, to see how localization works in .NET.

[Resource files](https://learn.microsoft.com/en-us/dotnet/core/extensions/resources) have been in the .NET framework since its inception. Basically, a resource file is an XML file (with `.resx` extension) in which we can put any static data we might need.

Before compilation, a program ([resgen](https://learn.microsoft.com/en-us/dotnet/framework/tools/resgen-exe-resource-file-generator)) converts these files to source code, which is embedded in the application's assembly and accessed from our code.

In the case of localization, we create a `.resx` file for every culture we support in our application (for example, `EnumTranslations.resx` for the default language, `EnumTranslations.it.resx` for Italian and so on). Each entry is in this format:

```csharp
<data name="Status_Created" xml:space="preserve">  
  <value>Created</value>  
</data>
```

To enable localization in the app, we add this code in our `Program.cs`, configuring the path the compiler uses to find the resource files:

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
```

[Under the hood](https://learn.microsoft.com/en-us/dotnet/core/extensions/localization), this line of code registers the services required to get the localized strings from the resource files. In addition to automatic culture detection by .NET (which works both on desktop/console and web applications!), this allows to transparently translate strings.

## Creating a custom expression to translate enums

Let's go back to our use case and write the mapper for our API. Let´s focus on the enum mapping.

As explained in the previous section, we put the translations in a resx file (`EnumTranslations.resx`) . To set a convention, let's say each item is in the form `<Enum_Name>_<Enum_Value>`, so our status enum will have the following fields generated for us:

```csharp
EnumTranslations.Status_Created,
EnumTranslations.Status_PaymentSuccessful,
EnumTranslations.Status_PaymentFailed,
EnumTranslations.Status_Shipped,
EnumTranslations.Status_Delivered
```

How can we use these fields in our mapping? Unfortunately, C# `Expression`s have a lot of [limitations](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/expression-trees/#limitations) and, together with LINQ-specific limits (explained [here](https://docs.automapper.org/en/stable/Queryable-Extensions.html#supported-mapping-options)) this means that these operations are not allowed (they won´t be translated to SQL): 

- `if` statements
- External classes/methods calls
- Dictionary access (not even if immutable) to get the right translation
- `switch/case` statements to select the right translation

I tried many approaches, but the only one I found was to create a cascade of ternary operators to select the correct translation... here's the mapping for our status field:

```csharp
CreateMap<Order, OrderResponse>()
	.ForMember(dst => dst.Status,
		opt => opt.MapFrom(src =>
			src.Status = Status.Created ? EnumTranslations.Status_Created :
			src.Status = Status.PaymentSuccessful ? EnumTranslations.Status_PaymentSuccessful :
			src.Status = Status.PaymentFailed ? EnumTranslations.Status_PaymentFailed :
			src.Status = Status.Shipped ? EnumTranslations.Status_Shipped :
			src.Status = Status.Delivere ? EnumTranslations.Status_Delivered :
			src.Status.ToString())
	);
```

This code has some issues we want to fix:
- It might become duplicated among multiple mapping profiles
- It needs to be updated to incorporate new enum values
- If the enum has a lot of values there il will be a lot of conditions...what happens if there is a typo or some parentheses are missed in the expression?

In the next section, we'll see how to generate this expression automatically, to prevent errors and make it reusable in multiple mappings and for any kind of enum.
## Automating the process

The code we implemented above is quite ugly, and here comes the goal of this post: provide a generic method to map enum to (translated) strings without writing all those ternary expressions by hand.

Here's the resulting extension class, with a method that can be applied to any expression accessing an enum: 

```csharp
public static class EnumTranslatorExpressionExtensions  
{  
    public static Expression<Func<TSource, string>> TranslateExpression<TSource, TEnum>(  
        this Expression<Func<TSource, TEnum>> enumExpression,
        Type enumTranslationsType
	  ) where TEnum : Enum  
    {  
        var enumValues = Enum.GetValues(typeof(TEnum))
					        .Cast<TEnum>()
					        .ToArray()
					        .Reverse();  
  
        Expression ternaryExpression = Expression.Constant("Unknown");  
        foreach (var enumValue in enumValues)  
        {
			var resourceKey = $"{typeof(TEnum).Name}_{enumValue.ToString()}";  
            var propertyInfo = enumTranslationsType.GetProperty(  
                resourceKey, BindingFlags.NonPublic | BindingFlags.Static  
            );  
  
            var staticPropertyAccess = Expression.Property(null, propertyInfo);  
            var enumValueExpression = Expression.Equal(  
                enumExpression.Body,  
                Expression.Constant(enumValue)  
            );  
            ternaryExpression = Expression.Condition(  
                enumValueExpression, staticPropertyAccess,ternaryExpression);
	    }  
        return Expression.Lambda<Func<TSource, string>>(  
            ternaryExpression, enumExpression.Parameters  
        );  
    }}
```

The method takes as input the source expression (the lambda we would have passed to automapper) and the type of the generated translations (to access the resource file).

It then gathers all the enum values and constructs the cascade of ternary operators to access all the resource file properties. For each value, we generate the three arguments to the ternary operator:
- The condition (`enumValueExpression`)
	  
      input value == enum value
- If the condition is true, we return the translated string

      EnumTranslations.<Enum-Name>_<Enum_Value>
- Otherwise, we go ahead with the other conditions in the chain

The method  has some rough edges, for example;
- it gives a generic "Unknown" default value if the enum value is invalid
- It needs to be given the type of the class generated from the resx file

Even with its drawbacks, we are now able to generate the mapping profile easily!

In my project I added another extension method, to make the generator more specific. The method automatically adds the `EnumTranslations` type to the call:

```csharp
public static class EnumMappingExtensions  
{  
    public static void MapFromTranslatedEnum<TSource, TDestination, TSourceMember>(  
        this IProjectionMemberConfiguration<TSource, TDestination, string> mapOptions,  
        Expression<Func<TSource, TSourceMember>> mapExpression  
    )        where TSourceMember : Enum  
    {  
	    mapOptions
		    .MapFrom(
			    mapExpression.TranslateExpression(typeof(EnumTranslations)
			)
		);  
    }
}
```

And voilà! Now the mapping profile can be easily written like this: 

```csharp
CreateMap<Order, OrderResponse>()  
    .ForMember(
	    src => src.Status,
	    opt => opt.MapFromTranslatedEnum(src => src.Status)
	);
```

## Conclusions

That's it for today!

In this post, I showed how automapper allows to easily project entities with its queryable extension. In particular, we saw how to translate enum values in their correct language using a nice extension method. I hope this will prove useful to other C# developers out there!

See you!

PS. I left the example code (with a different entity and enum names, called `MyEntity` and `MyEnum`) on [github](https://github.com/marcobacis/dotnet-enum-translation-expression-example/). 

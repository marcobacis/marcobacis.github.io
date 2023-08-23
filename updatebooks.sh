#!/usr/bin/env bash

response=$(curl -s --location 'https://api.notion.com/v1/databases/'$BOOKS_DATABASE_ID'/query' \
    --header 'Notion-Version: 2022-06-28' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer '$NOTION_API_KEY \
    --data '{
    "filter": {
        "and": [
            { "property": "Abandoned", "checkbox": { "equals": false }},
            { "property": "Start","date": {"is_not_empty": true}},
            { "property": "End","date": {"is_empty": true}}
        ]
    }
}')

echo $response | jq -r '[.results | .[] | {title: (.properties.Name.title | first | .plain_text), author: (.properties.Author.rich_text | first | .plain_text)}]' >data/books.json

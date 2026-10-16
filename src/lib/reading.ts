export const READING_PAGE_SIZE = 24;

export function sortReadBooks<T extends { data: { user_read_at?: string; pubDate?: string } }>(books: T[]) {
	return [...books].sort((a, b) => {
		const aDate = a.data.user_read_at || a.data.pubDate || '';
		const bDate = b.data.user_read_at || b.data.pubDate || '';
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
}

export function findReview(book: any, posts: any[]) {
	const bookId = String(book.data.book_id || '');

	return posts.find((post) => {
		if (post.data.draft || !post.data.bookReview) return false;
		return Boolean(post.data.goodreadsBookId) && String(post.data.goodreadsBookId) === bookId;
	});
}

export function addReviews<T>(books: T[], posts: any[]) {
	return books.map((book: any) => ({ book, review: findReview(book, posts) }));
}

export function toSearchIndex(books: { book: any; review?: any }[], currentlyReading: any[] = []) {
	const completedBooks = books.map(({ book, review }) => ({
		title: book.data.title,
		author: book.data.author_name,
		language: book.data.language || '',
		link: `https://www.goodreads.com/book/show/${book.data.book_id}`,
		cover: book.data.book_medium_image_url,
		readDate: book.data.user_read_at || '',
		rating: book.data.user_rating || 0,
		reviewUrl: review ? `/blog/${review.id}/` : '',
		currentlyReading: false,
	}));

	const currentBooks = currentlyReading.map((book) => ({
		title: book.data.title,
		author: book.data.author_name,
		language: book.data.language || '',
		link: book.data.link || `https://www.goodreads.com/book/show/${book.data.book_id}`,
		cover: book.data.book_medium_image_url,
		readDate: '',
		rating: 0,
		reviewUrl: '',
		currentlyReading: true,
	}));

	return [...currentBooks, ...completedBooks];
}

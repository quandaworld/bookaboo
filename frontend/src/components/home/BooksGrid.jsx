import BookCard from './BookCard';

const BooksGrid = ({ books, searchTitle }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6'>
      {books.filter((book) => {
        if (searchTitle === '') {
          return book;
        } else if (book.title.toLowerCase().includes(searchTitle.toString().toLowerCase())) {
          return book;
        }
      }).map((book, index) => (
        <BookCard key={book._id} book={book} index={index} />
      ))}
    </div>
  );
};

export default BooksGrid
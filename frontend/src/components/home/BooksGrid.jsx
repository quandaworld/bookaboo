import BookCard from './BookCard';

const BooksGrid = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((book, index) => (
        <BookCard book={book} index={index} />
      ))}
    </div>
  );
};

export default BooksGrid
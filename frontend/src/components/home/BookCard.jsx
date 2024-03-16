import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookCard = ({ book, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-2xl'>
      <div className='mt-2'>
        <span className='mr-4 text-gray-500'>Title</span>
        <span>{book.title}</span>
      </div>
      <div className='my-4'>
        <span className='mr-4 text-gray-500'>Author</span>
        <span>{book.author}</span>
      </div>
      <div className='my-4'>
        <span className='mr-4 text-gray-500'>Format</span>
        <span>{book.format}</span>
      </div>
      <div className='my-4'>
        <span className='mr-4 text-gray-500'>Pages</span>
        <span>{book.pages}</span>
      </div>
      <div className='my-4'>
        <span className='mr-4 text-gray-500'>Status</span>
        <span>{book.status}</span>
      </div>

      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <IoInformationCircleOutline
          className='text-2xl text-green-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && <BookModal book={book} index={index} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookCard;
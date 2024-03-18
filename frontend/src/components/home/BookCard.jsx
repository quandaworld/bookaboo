import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from '../modals/BookModal';
import DeleteModal from '../modals/DeleteModal';

const BookCard = ({ book, index }) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className='bg-slate-100 rounded-lg px-4 py-2 m-4 relative hover:shadow-2xl'>
      <div className='flex justify-between items-start mt-2'>
        <h2 className='w-fit px-2 py-1 bg-sky-200 rounded-md text-sky-900 font-semibold'>
          {`No. ${index + 1}`}
        </h2>

        <div className='flex justify-between items-center gap-x-2'>
          <IoInformationCircleOutline
            className='text-2xl text-green-800 cursor-pointer'
            onClick={() => setShowBookModal(true)}
          />
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600' />
          </Link>
          <MdOutlineDelete
            className='text-2xl text-red-600 cursor-pointer'
            onClick={() => setShowDeleteModal(true)}
          />
        </div>

        {showBookModal && <BookModal book={book} index={index} onClose={() => setShowBookModal(false)} />}
        {showDeleteModal && <DeleteModal book={book} index={index} onClose={() => setShowDeleteModal(false)} />}
      </div>
      <div className='mt-4'>
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
      <div className='mt-4 mb-1'>
        <span className='mr-4 text-gray-500'>Status</span>
        <span>{book.status}</span>
      </div>
    </div>
  );
};

export default BookCard;
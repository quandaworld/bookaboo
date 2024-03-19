import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { ImInfo } from "react-icons/im";
import { CgTrash } from "react-icons/cg";
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
          <ImInfo
            className='text-xl text-green-700 cursor-pointer'
            onClick={() => setShowBookModal(true)}
          />
          <Link to={`/books/edit/${book._id}`}>
            <FiEdit className='text-xl text-yellow-500' />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <CgTrash className='text-2xl text-red-600' />
          </Link>
          {/* <CgTrash
            className='text-2xl text-red-600 cursor-pointer'
            onClick={() => setShowDeleteModal(true)}
          /> */}
        </div>
      </div>
      {showBookModal && <BookModal book={book} index={index} onClose={() => setShowBookModal(false)} />}
      {showDeleteModal && <DeleteModal book={book} index={index} onClose={() => setShowDeleteModal(false)} />}

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
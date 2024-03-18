import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ book, index, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${book._id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className='fixed bg-black/75 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className='w-[600px] max-w-full bg-white rounded-xl p-5 relative text-start'
        >
          <h4 className='my-5 text-xl font-semibold text-center'>{`Are you sure you want to delete book No. ${index + 1}?`}</h4>
          <div className='flex justify-evenly pb-5 font-semibold'>
            <button
              className='w-[90px] p-4 bg-gray-400 text-white px-4 py-1 rounded-md'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='w-[90px] p-4 bg-red-600 text-white px-4 py-1 rounded-md'
              onClick={() => {
                handleDeleteBook();
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
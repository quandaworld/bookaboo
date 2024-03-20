import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(`"${book.title}" deleted successfully`, { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4 font-montserrat'>
      <HomeButton />
      <h1 className='text-3xl text-center mb-6 font-semibold'>{book.title}</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col border-2 border-gray-500 rounded-xl w-[600px] px-4 mx-auto text-lg' >
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
            <div className='my-4'>
              <span className='mr-4 text-gray-500'>Date Added</span>
              <span>{new Date(book.createdAt).toLocaleString()}</span>
            </div>
            <div className='my-4'>
              <span className='mr-4 text-gray-500'>Last Updated</span>
              <span>{new Date(book.updatedAt).toLocaleString()}</span>
            </div>
            <div className='my-4'>
              <span className='mr-4 text-gray-500'>Notes</span>
              <span>{book.notes}</span>
            </div>
          </div>

          <div className='flex flex-col items-center border-2 border-gray-500 rounded-xl w-[600px] p-4 mx-auto'>
            <h3 className='text-2xl font-medium'>Are you sure you want to delete this book?</h3>

            <button
              className='p-2 bg-red-600 text-white mt-6 mb-2 w-full rounded-lg text-lg font-medium'
              onClick={handleDeleteBook}
            >
              Yes, delete it
            </button>
          </div>
        </div>

      )}
    </div>
  )
}

export default DeleteBook
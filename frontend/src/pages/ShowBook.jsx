import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} =useParams();

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

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl text-center my-4'>Show Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto text-lg' >
          <div className='my-4'>
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
          <div className='my-4'>
            <span className='mr-4 text-gray-500'>Date Added</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500'>Last Updated</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500'>Notes</span>
            <span>{book.notes}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
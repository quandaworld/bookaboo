import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [format, setFormat] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      format,
      pages,
      status,
      notes,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
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
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl text-center my-4'>Add Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Printed'>Printed</option>
            <option value='Ebook'>Ebook</option>
            <option value='Audio'>Audio</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Pages</label>
          <input
            type='number'
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Unread'>Unread</option>
            <option value='Reading'>Reading</option>
            <option value='Finished'>Finished</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-52'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 rounded-lg text-lg' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default AddBook
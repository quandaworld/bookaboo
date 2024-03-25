import React, { useState } from 'react';
import HomeButton from '../components/HomeButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [format, setFormat] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '';
    axios
      .post(`${baseUrl}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(`"${data.title}" added successfully`, { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          enqueueSnackbar(`"${data.title}" already exists in library`, { variant: 'error' });
        } else if (error.response.status === 400) {
          enqueueSnackbar('Please fill out all required fields', { variant: 'error' });
        }
        console.log(error);
      });
  };

  return (
    <div className='p-4 font-montserrat'>
      <HomeButton />
      <h1 className='text-3xl text-center mb-6 font-semibold'>Add Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-gray-500 rounded-xl w-[600px] max-w-full px-4 mx-auto'>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>
            Title
            <span className='italic text-sm'> (required)</span>
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>
            Author
            <span className='italic text-sm'> (required)</span></label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full '
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>
            Format
            <span className='italic text-sm'> (required)</span>
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Printed'>Printed</option>
            <option value='Ebook'>Ebook</option>
            <option value='Audio'>Audio</option>
          </select>
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>
            Pages
            <span className='italic text-sm'> (required)</span>
          </label>
          <input
            type='number'
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full '
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>
            Status
            <span className='italic text-sm'> (required)</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Unread'>Unread</option>
            <option value='Reading'>Reading</option>
            <option value='Finished'>Finished</option>
          </select>
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full h-40'
          />
        </div>
        <button className='p-2 mt-6 mb-4 w-full bg-sky-800 rounded-lg text-lg self-center font-medium text-white' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default AddBook
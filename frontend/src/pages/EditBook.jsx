import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [format, setFormat] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setFormat(response.data.format);
        setPages(response.data.pages);
        setStatus(response.data.status);
        setNotes(response.data.notes);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
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
      .put(`${baseUrl}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(`"${data.title}" edited successfully`, { variant: 'success' });
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
      <h1 className='text-3xl text-center mb-6 font-semibold'>Edit Book</h1>
      <div className='flex flex-col border-2 border-gray-500 rounded-xl w-[600px] max-w-full px-4 mx-auto'>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full '
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>Format</label>
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
          <label className='text-lg mr-4 text-gray-500'>Pages</label>
          <input
            type='number'
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full '
          />
        </div>
        <div className='my-2'>
          <label className='text-lg mr-4 text-gray-500'>Status</label>
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
        <button className='p-2 mt-6 mb-4 w-full bg-sky-800 rounded-lg text-lg self-center font-medium text-white' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
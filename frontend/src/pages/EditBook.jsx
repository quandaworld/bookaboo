import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [format, setFormat] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
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
      .put(`http://localhost:5555/books/${id}`, data)
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
      <h1 className='text-3xl text-center mb-6'>Edit Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] px-4 mx-auto'>
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
            className='border-2 border-gray-500 px-4 py-2 w-full h-40'
          />
        </div>
        <button className='p-2 bg-sky-300 m-6 rounded-lg text-lg' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
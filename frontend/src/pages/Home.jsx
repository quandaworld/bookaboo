import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BiSolidGridAlt } from 'react-icons/bi';
import { PiListBulletsFill } from 'react-icons/pi';
import BooksGrid from '../components/home/BooksGrid';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table'); // Set default display to table

  // Fetch book data, update component with fetched data, and track loading state
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='pt-4 pb-1 px-4 font-montserrat flex flex-col h-screen justify-between'>
      <div>
        <div className='p-1 flex justify-between items-center'>
          <h1 className='text-4xl my-8 font-semibold text-sky-900'>My Library Pro</h1>
          <div className='flex items-center gap-0.5 text-sky-800'>
            <PiListBulletsFill
              className='cursor-pointer text-3xl hover:text-sky-700'
              onClick={() => setShowType('table')}
            />
            <BiSolidGridAlt
              className='cursor-pointer text-3xl hover:text-sky-700'
              onClick={() => setShowType('grid')}
            />
            <Link to='/books/add'>
              <button className='bg-sky-800 text-white rounded-lg px-3 py-2 text-lg font-semibold ml-5 hover:bg-sky-700'>Add new book</button>
            </Link>
          </div>
        </div>
        {loading ? <Spinner /> : showType === 'table' ? <BooksTable books={books} /> : <BooksGrid books={books} />}
      </div>

      <p className="mt-2 opacity-50 self-center">
        Copyright &copy; {new Date().getFullYear()}
        <a href="https://github.com/quandaworld" target="_blank">
          <strong> quandaworld</strong>
        </a>
      </p>

    </div>
  )
}

export default Home
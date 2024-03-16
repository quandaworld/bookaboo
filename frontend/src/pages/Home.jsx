import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
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
    <div className='p-4'>
      <div className='p-1 flex justify-between items-center'>
        <h1 className='text-3xl my-8'>My Library Pro</h1>
        <div className='flex items-center gap-1 text-sky-800 text-4xl'>
          <PiListBulletsFill
            className='cursor-pointer'
            onClick={() => setShowType('table')}
          />
          <BiSolidGridAlt
            className='cursor-pointer'
            onClick={() => setShowType('grid')}
          />
          <Link to='/books/add'>
            <MdOutlineAddBox />
          </Link>
        </div>
      </div>

      {loading ? <Spinner /> : showType === 'table' ? <BooksTable books={books} /> : <BooksGrid books={books} />}
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BiSolidGridAlt } from 'react-icons/bi';
import { PiListBulletsFill } from 'react-icons/pi';
import { IoReloadCircle } from "react-icons/io5";
import BooksGrid from '../components/home/BooksGrid';
import BooksTable from '../components/home/BooksTable';
import { useSnackbar } from 'notistack';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table'); // Set default display to table
  const [sortOrder, setSortOrder] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const { enqueueSnackbar } = useSnackbar();

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

  const sortBooks = (key, order = sortOrder) => {
    if (order === '') {
      enqueueSnackbar('Please select sort order', { variant: 'warning' });
      return;
    } else if (key === '') {
      enqueueSnackbar('Please select sort by', { variant: 'warning' });
      return;
    }

    const sortedBooks = [...books];
    if (key === 'pages') {
      sortedBooks.sort((a, b) => a[key] - b[key]);
    } else {
      sortedBooks.sort((a, b) => a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1);
    }

    if (order === 'asc') {
      setBooks(sortedBooks)
    } else if (order === 'dsc') {
      setBooks(sortedBooks.reverse());
    }
  };

  const filterBooks = (filterValue, filterKey) => {
    const filteredBooks = [...books].filter(book => book[filterKey] === filterValue);
    console.log(filterBy, filterValue);
    setBooks(filteredBooks);
  }

  return (
    <div className='pt-4 pb-1 px-4 font-montserrat flex flex-col h-screen justify-between'>
      <div>
        <div className='p-1 flex justify-between items-center'>
          <h1 className='text-4xl my-8 font-semibold text-sky-900'>My Library Pro</h1>
          <div className='md:flex gap-3'>
            {/* Sort input */}
            <select
              className='border-2 text-sky-900 rounded-md'
              onChange={(e) => {
                setSortBy(e.target.value);
                sortBooks(e.target.value);
              }}
            >
              <option value=''>Sort by</option>
              <option value='title'>Title</option>
              <option value='author'>Author</option>
              <option value='format'>Format</option>
              <option value='pages'>Pages</option>
              <option value='status'>Status</option>
            </select>
            <select
              className='border-2 text-sky-900 rounded-md'
              onChange={(e) => {
                setSortOrder(e.target.value);
                sortBooks(sortBy, e.target.value);
              }}
            >
              <option value=''>Sort order</option>
              <option value='asc'>Ascending</option>
              <option value='dsc'>Descending</option>
            </select>

            {/* Filter input */}
            <select
              className='border-2 text-sky-900 rounded-md'
              onChange={(e) => filterBooks(e.target.value, 'status')}
            >
              <option value=''>Filter by status</option>
              <option value='Reading'>Reading</option>
              <option value='Unread'>Unread</option>
              <option value='Finished'>Finished</option>
            </select>
            <select
              className='border-2 text-sky-900 rounded-md'
              onChange={(e) => filterBooks(e.target.value, 'format')}
            >
              <option value=''>Filter by format</option>
              <option value='Printed'>Printed</option>
              <option value='Ebook'>Ebook</option>
              <option value='Audio'>Audio</option>
            </select>
            <IoReloadCircle
              className='text-sky-800 text-3xl hover:text-sky-700 cursor-pointer'
              onClick={() => window.location.reload()}
            />
          </div>
          <div className='flex items-center gap-4 text-sky-800'>
            <div className='flex'>
              <PiListBulletsFill
                className='cursor-pointer text-3xl hover:text-sky-700'
                onClick={() => setShowType('table')}
              />
              <BiSolidGridAlt
                className='cursor-pointer text-3xl hover:text-sky-700'
                onClick={() => setShowType('grid')}
              />
            </div>
            <Link to='/books/add'>
              <button className='bg-sky-800 text-white rounded-lg px-3 py-2 text-lg font-semibold hover:bg-sky-700'>Add new book</button>
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
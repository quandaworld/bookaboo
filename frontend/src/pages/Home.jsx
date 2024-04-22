import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BiSolidGridAlt } from 'react-icons/bi';
import { PiListBulletsFill, PiAlignBottomFill } from 'react-icons/pi';
import { IoMdAdd } from "react-icons/io";
import { CgAddR } from "react-icons/cg";


import BooksGrid from '../components/home/BooksGrid';
import BooksTable from '../components/home/BooksTable';
import SortFilter from '../components/home/SortFilter';
import { useSnackbar } from 'notistack';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table'); // Set default display to table
  const [sortOrder, setSortOrder] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTitle, setSearchTitle] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch book data, update component with fetched data, and track loading state
  useEffect(() => {
    setLoading(true);
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '';
    axios
      .get(`${baseUrl}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setOriginalBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const sortBooks = (key, order = sortOrder) => {
    if (order === '') {
      return enqueueSnackbar('Please select sort order', { variant: 'warning' });
    } else if (key === '') {
      return enqueueSnackbar('Please select sort by', { variant: 'warning' });
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
    let filteredBooks;

    if (document.getElementById('filter_status').selectedIndex === 0 ||
      document.getElementById('filter_format').selectedIndex === 0
    ) {
      filteredBooks = [...originalBooks];
    } else {
      filteredBooks = [...books];
    }

    filteredBooks = filteredBooks.filter(book => book[filterKey] === filterValue);
    setBooks(filteredBooks);
  }

  const reset = () => {
    setBooks(originalBooks);
    document.getElementById('sort_by').selectedIndex = 0;
    document.getElementById('sort_order').selectedIndex = 0;
    document.getElementById('filter_status').selectedIndex = 0;
    document.getElementById('filter_format').selectedIndex = 0;
    document.getElementById('search_bar').value = '';
    setSortBy('');
    setSortOrder('');
    setSearchTitle('');
  }

  return (
    <div className='py-4 px-4 font-montserrat flex flex-col h-screen justify-between'>
      <div>
        <div className='p-1 flex gap-2 justify-between items-center'>
          <div className='flex items-center'>
            <PiAlignBottomFill className='text-6xl text-orange-600 max-md:text-5xl' />
            <h1 className='text-5xl my-8 font-semibold text-sky-800 max-md:text-4xl'>bookaboo</h1>
          </div>
          <div className='flex gap-3'>
            <input
              id='search_bar'
              type="text"
              placeholder='Search by title...'
              className='border-2 rounded-md px-1 w-[300px] max-md:hidden'
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <SortFilter
              sortBooks={sortBooks}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBooks={filterBooks}
              reset={reset}
            />
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex text-sky-800 max-md:hidden'>
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
              <button className='flex items-center gap-1 max-md:hidden bg-gradient-to-r from-sky-500 to-sky-800 text-white rounded-md px-3 py-2 text-lg font-semibold hover:bg-sky-700'>
                New <IoMdAdd className='text-xl' />
              </button>
              <CgAddR
                className='cursor-pointer text-4xl text-sky-900 hover:text-sky-700 md:hidden'
              />
            </Link>
          </div>
        </div>

        {/* Add search bar for mobile UI */}
        <div className='flex justify-center gap-3 sm:hidden'>
          <input
            id='search_bar'
            type="text"
            placeholder='Search by title...'
            className='border-2 rounded-md px-1 w-full'
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <div className='flex text-sky-800'>
            <PiListBulletsFill
              className='cursor-pointer text-3xl hover:text-sky-700'
              onClick={() => setShowType('table')}
            />
            <BiSolidGridAlt
              className='cursor-pointer text-3xl hover:text-sky-700'
              onClick={() => setShowType('grid')}
            />
          </div>
        </div>
        {loading ? <Spinner /> : showType === 'table' ? <BooksTable books={books} searchTitle={searchTitle} /> : <BooksGrid books={books} searchTitle={searchTitle} />}
      </div>

      <p className="mt-2 opacity-50 self-center">
        Copyright &copy; {new Date().getFullYear()}
        <a href="https://quannguyendev.com/" target="_blank">
          <b> quannguyendev.com</b>
        </a>
      </p>

    </div>
  )
}

export default Home
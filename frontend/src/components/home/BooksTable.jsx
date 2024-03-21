import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgTrash } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { ImInfo } from "react-icons/im";

const BooksTable = ({ books, searchTitle }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr className='h-8 bg-sky-200 text-sky-900'>
          <th className='rounded-md font-semibold'>No.</th>
          <th className='rounded-md font-semibold'>Title</th>
          <th className='rounded-md font-semibold max-md:hidden'>Author</th>
          <th className='rounded-md font-semibold max-md:hidden'>Format</th>
          <th className='rounded-md font-semibold max-md:hidden'>Pages</th>
          <th className='rounded-md font-semibold max-md:hidden'>Status</th>
          <th className='rounded-md font-semibold'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.filter((book) => {
          if (searchTitle === '') {
            return book;
          } else if (book.title.toLowerCase().includes(searchTitle.toString().toLowerCase())) {
            return book;
          }
        }).map((book, index) => (
          <tr key={book._id} className='h-8 bg-slate-100'>
            <td className='rounded-md text-center'>
              {index + 1}
            </td>
            <td className='rounded-md text-center'>
              {book.title}
            </td>
            <td className='rounded-md text-center max-md:hidden'>
              {book.author}
            </td>
            <td className='rounded-md text-center max-md:hidden'>
              {book.format}
            </td>
            <td className='rounded-md text-center max-md:hidden'>
              {book.pages}
            </td>
            <td className='rounded-md text-center max-md:hidden'>
              {book.status}
            </td>

            {/* Actions column */}
            <td className='rounded-md text-center'>
              <div className='flex justify-center items-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <ImInfo className='text-xl text-green-700' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <FiEdit className='text-xl text-yellow-500' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <CgTrash className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
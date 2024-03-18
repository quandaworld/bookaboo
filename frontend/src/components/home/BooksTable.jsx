import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md font-semibold'>No.</th>
          <th className='border border-slate-600 rounded-md font-semibold'>Title</th>
          <th className='border border-slate-600 rounded-md font-semibold max-md:hidden'>Author</th>
          <th className='border border-slate-600 rounded-md font-semibold max-md:hidden'>Format</th>
          <th className='border border-slate-600 rounded-md font-semibold max-md:hidden'>Pages</th>
          <th className='border border-slate-600 rounded-md font-semibold max-md:hidden'>Status</th>
          <th className='border border-slate-600 rounded-md font-semibold'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.format}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.pages}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.status}
            </td>

            {/* Actions column */}
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center items-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <IoInformationCircleOutline className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
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
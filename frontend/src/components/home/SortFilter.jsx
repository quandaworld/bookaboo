import React from 'react'
import { IoReloadCircle } from "react-icons/io5";

const SortFilter = ({ sortBooks, sortOrder, setSortOrder, sortBy, setSortBy, filterBooks, reset }) => {
  return (
    <div className='md:flex gap-3 max-md:hidden'>
      {/* Sort input */}
      <select
        id='sort_by'
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
        id='sort_order'
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
        id='filter_status'
        className='border-2 text-sky-900 rounded-md'
        onChange={(e) => filterBooks(e.target.value, 'status')}
      >
        <option value=''>Filter by status</option>
        <option value='Reading'>Reading</option>
        <option value='Unread'>Unread</option>
        <option value='Finished'>Finished</option>
      </select>
      <select
        id='filter_format'
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
        onClick={reset}
      />
    </div>

  )
}

export default SortFilter
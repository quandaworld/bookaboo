import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookModal = ({ book, index, onClose }) => {
  const [coverUrl, setCoverUrl] = useState('');

  // Fetch book cover from Google Books API
  const fetchBookCover = async (title, author) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          title
        )}+inauthor:${encodeURIComponent(author)}&maxResults=1`
      );
      
      if (response.data.items && response.data.items.length > 0) {
        const bookInfo = response.data.items[0].volumeInfo;
        if (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) {
          setCoverUrl(bookInfo.imageLinks.thumbnail);
        }
      }
    } catch (error) {
      console.log('Error fetching book cover:', error);
    }
  };

  useEffect(() => {
    if (book.title && book.author) {
      fetchBookCover(book.title, book.author);
    }
  }, [book]);
  return (
    <div
      className='fixed bg-black/75 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full bg-white rounded-xl p-7 relative text-start'
      >
        <div className='flex justify-between'>
          <h2 className='w-fit px-3 py-1 bg-sky-200 rounded-md font-semibold text-sky-900'>
            {`No. ${index + 1}`}
          </h2>
          <IoClose
            className='text-3xl text-red-600 cursor-pointer'
            onClick={onClose}
          />
        </div>
        
        <h4 className='my-5 text-xl font-semibold text-center'>{book.title}</h4>

        {coverUrl && (
          <div className='my-4 flex justify-center'>
            <img 
              src={coverUrl} 
              alt={`Cover of ${book.title}`} 
              className='h-64 object-contain rounded shadow-md'
            />
          </div>
        )}

        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Author</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Format</span>
          <span>{book.format}</span>
        </div>
        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Pages</span>
          <span>{book.pages}</span>
        </div>
        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Status</span>
          <span>{book.status}</span>
        </div>
        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Date Added</span>
          <span>{new Date(book.createdAt).toLocaleString()}</span>
        </div>
        <div className='my-4'>
          <span className='mr-4 text-gray-500'>Last Updated</span>
          <span>{new Date(book.updatedAt).toLocaleString()}</span>
        </div>
        <div className='mt-4'>
          <span className='mr-4 text-gray-500'>Notes</span>
          <span>{book.notes}</span>
        </div>
      </div>
    </div>
  );
};

export default BookModal;

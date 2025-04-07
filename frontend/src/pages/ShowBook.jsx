import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const { id } = useParams();

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
    setLoading(true);
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '';
    axios
      .get(`${baseUrl}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        // Fetch book cover after getting book details
        if (response.data.title && response.data.author) {
          fetchBookCover(response.data.title, response.data.author);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div className='p-4 font-montserrat'>
      <HomeButton />
      <h1 className='text-3xl text-center mb-6 font-semibold'>{book.title}</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-gray-500 rounded-xl w-[600px] max-w-full px-4 mx-auto text-lg' >
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
          <div className='my-4'>
            <span className='mr-4 text-gray-500'>Notes</span>
            <span>{book.notes}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
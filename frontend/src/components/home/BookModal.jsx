import { AiOutlineClose } from 'react-icons/ai';

const BookModal = ({ book, index, onClose }) => {
  return (
    <div
      className='fixed bg-black/75 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full bg-white rounded-xl p-7 relative text-start'
      >
        <AiOutlineClose
          className='absolute right-4 top-4 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {index + 1}
        </h2>
        <h4 className='my-5 text-xl font-semibold text-center'>{book.title}</h4>

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
    </div>
  );
};

export default BookModal;
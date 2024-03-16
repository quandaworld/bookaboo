import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <FaArrowLeftLong className='text-2xl' />
      </Link>
    </div>
  )
}

export default BackButton
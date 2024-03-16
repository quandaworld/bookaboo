import { Link } from 'react-router-dom';
import { ImHome } from "react-icons/im";

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <ImHome className='text-2xl' />
      </Link>
    </div>
  )
}

export default BackButton
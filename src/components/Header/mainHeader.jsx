import { Link } from 'react-router-dom';
import logoWhite from '../../assets/images/logo-white.svg';

export default function Header() {
  return (
    <div className="w-full h-16 fixed top-0 left-0 z-10 px-4 py-3 bg-color-blue-main text-white text-xl flex justify-center items-center">
      <div className='w-full flex justify-between items-center px-36 gap-16'>
        <Link className="w-14" to="/"><img src={logoWhite} alt='' /></Link>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className="flex gap-8">
            <Link className='font-cafe24' to="/problem">Problem</Link>
            <Link className='font-cafe24' to="/crew">Crew</Link>
          </div>
          <div className='flex gap-6'>
            <Link className="underline" to="/signin">sign in</Link>
            <Link to="/signup">sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

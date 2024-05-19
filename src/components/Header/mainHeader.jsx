import { Link } from 'react-router-dom';
import logoWhite from '../../assets/images/logo-white.svg';

export default function Header() {
  return(
    <div className="w-screen h-16 top-0 left-0 fixed px-[120px] py-3
      bg-color-blue-main flex flex-row gap-16 text-white text-xl">
       <Link className="w-14" to="/"><img src={logoWhite} alt='' /></Link>
       <div className="justify-start items-center gap-16 flex">
        <Link className='font-cafe24' to="/problem">Problem</Link>
        <Link className='font-cafe24' to="/crew">Crew</Link>
       </div>
    </div>
  )
}
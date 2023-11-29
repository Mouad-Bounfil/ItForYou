import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping , faUser , faShoppingCart , faSignInAlt , faInfo , faHome , faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const HeaderTest = () => {
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-evenly">
          <div className="ml-5">
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-500'>IT </span>
            <span className='text-slate-700'> -Maroc </span>
          </h1>
          </div>

        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-2 text-lg text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full border border-red-500 border-r-0 pl-12 py-2 pr-3 rounded-l-md focus:outline-none"
            placeholder="search"
          />
          <button className="border border-red-400 text-white  bg-red-500 px-8 rounded-r-md hover:bg-transparent hover:text-red- transition">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4">

          <Link to='/' className='flex items-center justify-center flex-col'>
          <div className="text-2xl" >
            <FontAwesomeIcon icon={faHome} />
            </div>
            <div className="text-xs leading-3">Home</div>
          </Link>
          <Link to='/about' className='flex items-center justify-center flex-col'>
            <div className="text-2xl">
            <FontAwesomeIcon icon={faInfo} />
            </div>
            <div className="text-xs leading-3">About</div>
          </Link>
          <Link to='/sign-in' className='flex items-center justify-center flex-col'>
          <div className="text-2xl">
            <FontAwesomeIcon icon={faSignInAlt} />
            </div>
            <div className="text-xs leading-3">Sign in</div>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default HeaderTest;

import React from 'react';
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
  } from '../redux/user/userSlice';
import { useDispatch , useSelector } from 'react-redux';


const DeleteAcount = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleDeleteUser = async () => {
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
    return (
      <div className="flex flex-col items-center justify-center p-4 h-[500px]">
        <div className="flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="font-semibold mb-2 text-3xl ">Confirm</p>
        <p className="text-2xl text-gray-600 mb-4">Please confirm if you wish to permanently remove your account.<br></br> <span className='flex items-center justify-center '>This action cannot be undone.</span></p>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
          onClick={handleDeleteUser}
          >
            Yes, Delete!
          </button>
          
        </div>
      </div>
    );
  };
  

  export default DeleteAcount;

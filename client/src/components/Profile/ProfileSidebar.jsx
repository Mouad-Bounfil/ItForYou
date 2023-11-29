import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../../redux/user/userSlice';

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
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
    <div className="w-full bg-white shadow-sm  p-2 h-screen">
      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5] 
        ${active === 1 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[#1900ff]" : ""
          } `}
        >
          Profile
        </span>
      </div>
      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5]
        ${active === 2 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[#1900ff] " : ""
          } `}
        >
          Orders
        </span>
      </div>
      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5]
        ${active === 3 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[#1900ff]" : ""
          } `}
        >
          Create Listing
        </span>
      </div>

      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5]
        ${active === 4 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(4)}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[#1900ff]" : ""
          } `}
        >
          Show Listings
        </span>
      </div>

      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5] 
        ${active === 5 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[#1900ff]" : ""
          } `}
        >
          Delete account 
        </span>
      </div>

      <div
        className= {`flex items-center cursor-pointer w-full mb-1 p-5 rounded hover:bg-[#F6F6F5]
        ${active === 6 ? "bg-[#F6F6F5] " : "" }`}
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[#1900ff]" : ""
          } `}
        >
          Change Password
        </span>
      </div>

      

      
      <div
        className="single_item flex items-center cursor-pointer w-full  mb-1 p-5 rounded hover:bg-[#F6F6F5] "
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#1900ff" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[#1900ff]" : ""
          } `}
          onClick={handleSignOut}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;

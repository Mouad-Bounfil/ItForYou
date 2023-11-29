import React, { useState } from 'react';
import styles from '../styles';
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
    const [ active , setActive ] = useState(1);
  return (
    <div>
        <div className={` flex pt-1`} >
            <div className="w-[400px] 800px:w-[335px] sticky 800px:mt-0 ">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
    </div>
  )
}

export default ProfilePage
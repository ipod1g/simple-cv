import React from "react";
import "./ProfileTab.css";
import Selfie from "../assets/user1.png";

const ProfileTab = () => {
   return (
      <div className="profile-tab-container">
         <div className="profile-tab">
            <div className="selfie-wrapper">
               <img src={Selfie} alt="My selfie" height="80px" />
            </div>
            <div>Lorem Ipsum Lorem Ipsum Lorem Ipsum</div>
            <div className="social">Lorem Ipsum</div>
            <div className="footer">Lorem Ipsum</div>
         </div>
      </div>
   );
};

export default ProfileTab;

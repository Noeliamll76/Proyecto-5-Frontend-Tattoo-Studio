
import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { GetUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";


export const Profile = () => {

    const navigate = useNavigate();
   
    const rdxCredentials = useSelector(userData);
    console.log(rdxCredentials)
        
    const {name, email, phone, role} = rdxCredentials.credentials.data;
      
    const updateUser = () => {
        setTimeout(() => {
            navigate("/update");
        }, 1000);
    }

    return (
        <div className="loginDesign">
            <div className='credentialsDesign'> 
            <div> {name} </div>
            <div>{email} </div>
            <div> {phone} </div>
            <div> {role} </div>
        </div>

            <div className='buttonSubmit' onClick={updateUser}>UPDATE PROFILE </div>
           </div>
    )
}



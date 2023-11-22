import './SuperAdmin.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SuperAdmin = () => {

    const navigate = useNavigate();
    
   

    const callUsersListClick = () => {
        
        navigate("/userList");
    }
    const callUsersAppointmentsClick = () => {
       
        navigate("/userAppointments");
    }
    const callCreateArtistClick = () => {
        
        ("/createArtist");
    }
    return (
        <>
            <div className="superDesign">
                <div className={`superSubmit `} onClick={callUsersListClick}>
                Show user list
                </div>
        
                <div className={`superSubmit `} onClick={callUsersAppointmentsClick}>
                Show user appointments
                </div>
          
                <div className={`superSubmit `} onClick={callCreateArtistClick}>
                Create tattoo artist
                </div>

            </div>
        </>
    )
}

import './SuperAdmin.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SuperAdmin = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);
   

    const callUsersListClick = () => {
        setChange(!change)
        navigate("/");
        // navigate("/userList");
    }
    const callUsersAppointmentsClick = () => {
        setChange(!change)
        navigate("/");
        // navigate("/userAppointments");
    }
    const callCreateArtistClick = () => {
        setChange(!change)
        // navigate("/createArtist");
        navigate("/");
    }
    return (
        <>
            <div className="homeDesign">
                <div className={`cardSubmit ${!change}`} onClick={callUsersListClick}>
                Show user list
                </div>
        
                <div className={`cardSubmit ${!change}`} onClick={callUsersAppointmentsClick}>
                Show user appointments
                </div>
          
                <div className={`cardSubmit ${!change}`} onClick={callCreateArtistClick}>
                Create tattoo artist
                </div>

            </div>
        </>
    )
}

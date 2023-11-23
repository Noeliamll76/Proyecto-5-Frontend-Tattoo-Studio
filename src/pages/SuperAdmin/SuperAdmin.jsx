import './SuperAdmin.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';

export const SuperAdmin = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const tokenDecodificated = jwtDecode(rdxUser.credentials.token);
    const role = tokenDecodificated.role

    const callUsersListClick = () => { navigate("/userList"); }
    const callUsersAppointmentsClick = () => { navigate("/userAppointments"); }
    const callCreateArtistClick = () => { navigate("/createArtist"); }
    
    return (
        <>
            <div className="superDesign">
                {role === "super_admin"
                    ? (
                        <>
                            <div className={`superSubmit `} onClick={callUsersListClick}>
                                Show user list
                            </div>

                            <div className={`superSubmit `} onClick={callUsersAppointmentsClick}>
                                Show user appointments
                            </div>

                            <div className={`superSubmit `} onClick={callCreateArtistClick}>
                                Create tattoo artist
                            </div>
                        </>
                    )
                    : (
                        navigate("/")
                    )
                }
            </div>
        </>
    )
}

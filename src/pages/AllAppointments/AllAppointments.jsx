import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../../services/apiCalls';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { AppointmentCard } from '../../common/AppointmentCard/AppointmentCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { jwtDecode } from 'jwt-decode';
import "./AllAppointments.css";

export const AllAppointments = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const token = (rdxUser.credentials.token);
    const tokenDecodificated = jwtDecode(rdxUser.credentials.token);
    const role = tokenDecodificated.role

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            setTimeout(() => {
                getAllAppointments(token)
                    .then(
                        appointments => {
                            setAppointments(appointments.data.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }, 1000)
        }
    }, [appointments]);

    const callExitClick = () => { navigate("/superAdmin"); }

    return (
        <div className='citasDesign'>
            {role === "super_admin"
                ? (
                    appointments.length > 0 ? (
                        <div className='appointmentsRoster'>
                            {appointments.map(appointment => {
                                return (
                                    <AppointmentCard
                                        key={appointment.id}
                                        artist_id={appointment.artist_id}
                                        type_work={appointment.type_work}
                                        description={appointment.description}
                                        date={appointment.date}
                                        shift={appointment.shift}
                                        tattoo_artist={appointment.Tattoo_artist}
                                    />)
                            })
                            }
                        </div>
                    )
                        : (
                            <div><LoadingSpinner /></div>
                        )
                )
                : (
                    navigate("/")
                )
            }
            <div className={`ExitSubmit `} onClick={callExitClick}>
                EXIT
            </div>
        </div>
    )
}
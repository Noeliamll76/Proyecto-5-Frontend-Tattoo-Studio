
import React, { useState, useEffect } from 'react';
import './AppointmentsProfile.css';
import { loginAppointmentsById } from '../../services/apiCalls';
import { AppointmentCard } from '../../common/AppointmentCard/AppointmentCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginAppointment } from "../../pages/appointmentSlice";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';

export const AppointmentsProfile = () => {

    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token
    const tokenDecodificated = jwtDecode(token)
    const idToLogin = tokenDecodificated.id
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            setTimeout(() => {
                loginAppointmentsById(idToLogin)
                    .then(
                        citas => {
                            setAppointments(citas.data.data)
                        }
                    )
                    .catch(error => {
                        console.log("dentro del cath: " + error)
                    })
            }, 1000)
        }
    }, [appointments]);

    const tellMe = (argumento) => {
        dispatch(loginAppointment({ credentialAppointment: argumento }))
        setTimeout(() => {
            navigate("/appointmentsUpdate");
        }, 500);
    }

    return (
        <div className='citasDesign'>
            <div />
            {appointments.length > 0 ? (
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
                                selected={"selectedCard"}
                                selectFunction={() => tellMe(appointment)}
                            />
                        )
                    })
                    }
                </div>
            )
                : (
                    <div><LoadingSpinner /></div>
                )
            }
        </div>
    )
}


import React, { useState, useEffect } from 'react';
import './AppointmentsProfile.css';
import { loginAppointmentsById } from '../../services/apiCalls';
import { AppointmentCard } from '../../common/AppointmentCard/AppointmentCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const AppointmentsProfile = () => {

    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            setTimeout(() => {
                loginAppointmentsById(token, "6")
                    .then(
                        citas => {
                            setAppointments(citas.data.data)
                            console.log(citas.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }, 2000)
        }
    }, [appointments]);

    const tellMe = (argumento) => {
        console.log(argumento)
    }

    return (
        <div className='citasDesign'>
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
                                tattoo_artist={appointment.tattoo_artist}
                                selected={"selectedCard"}
                                selectFunction={() => tellMe(tattoo)}
                            />)
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

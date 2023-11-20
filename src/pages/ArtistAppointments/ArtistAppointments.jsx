

import React, { useState, useEffect } from 'react';
import './ArtistAppointments.css';
import { loginArtistAppointments } from '../../services/apiCalls';
import { ArtistAppCard } from '../../common/ArtistAppCard/ArtistAppCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { artistData } from "../../pages/artistSlice";
import { jwtDecode } from 'jwt-decode';

export const ArtistAppointments = () => {

    const rdxArtist = useSelector(artistData);
console.log (rdxArtist)
    const token = rdxArtist.credentials.token
    const tokenDecodificated = jwtDecode(token)
    const idToLogin = tokenDecodificated.id
console.log(idToLogin)

    const navigate = useNavigate();

    const [artistApp, setArtistApp] = useState([]);

    useEffect(() => {
        if (artistApp.length === 0) {
            setTimeout(() => {
                loginArtistAppointments(idToLogin, token)
                    .then(
                        citas => {
                            setArtistApp(citas.data.data)
                            console.log(setArtistApp)
                            console.log(citas)
                        }
                    )
                    .catch(error => {
                        console.log("dentro del cath: " + error)
                    }
                    )
            }, 500)
        }
    }, [artistApp]);

    const tellMe = (argumento) => {
       console.log(argumento)
        setTimeout(() => {
            navigate("/");
        }, 500);
    }

    return (
        <div className='citasDesign'>

            <div artistApp />
            {artistApp.length > 0 ? (
                <div className='artistAppRoster'>
                    {artistApp.map(appointment => {
                        return (
                            <ArtistAppCard
                                key={appointment.id}
                                tattoo_artist={appointment.Tattoo_artist}
                                user_id={appointment.user_id}
                                Client={appointment.Client}
                                phone={appointment.phone}
                                type_work={appointment.type_work}
                                description={appointment.description}
                                date={appointment.date}
                                shift={appointment.shift}
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

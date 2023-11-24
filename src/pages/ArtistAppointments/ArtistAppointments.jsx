
import React, { useState, useEffect } from 'react';
import './ArtistAppointments.css';
import { loginArtistAppointments } from '../../services/apiCalls';
import { ArtistAppCard } from '../../common/ArtistAppCard/ArtistAppCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { artistData } from "../../pages/artistSlice";

export const ArtistAppointments = () => {

    const rdxArtist = useSelector(artistData);
    const token = rdxArtist.credentials.token;
    const navigate = useNavigate();

    const [artistApp, setArtistApp] = useState([]);

    useEffect(() => {
        if (artistApp.length === 0) {
            setTimeout(() => {
                loginArtistAppointments(token)
                    .then(
                        citas => {
                            setArtistApp(citas.data.data)
                        }
                    )
                    .catch(error => {
                        navigate("/LogProfesional")
                    }
                    )
            }, 1000)
        }
    }, [artistApp]);

    return (
        <div className='citasDesign'>
            <div artistApp />
            {artistApp.length > 0 ? (
                <div className='artistAppRoster'>
                    {artistApp.map(appointment => {
                        return (
                            <ArtistAppCard
                                key={appointment.id}
                                tattoo_artist={rdxArtist.credentials.data.name}
                                user_id={appointment.user_id}
                                Client={appointment.Client}
                                phone={appointment.phone}
                                type_work={appointment.type_work}
                                description={appointment.description}
                                date={appointment.date}
                                shift={appointment.shift}
                            />
                        )
                    })
                    }
                </div>
            )
                :
                (
                    <div><LoadingSpinner /></div>
                )
            }
        </div>
    )
}

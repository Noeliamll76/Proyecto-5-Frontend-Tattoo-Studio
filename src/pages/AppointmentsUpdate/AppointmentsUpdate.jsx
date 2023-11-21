
import React, { useState, useEffect } from 'react';
import './AppointmentsUpdate.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { updateAppointmentById, GetArtist } from "../../services/apiCalls";

import { useSelector } from "react-redux";
import { appointmentData } from "../../pages/appointmentSlice";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';

export const AppointmentsUpdate = () => {

    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token
    const tokenDecodificated = jwtDecode(token)
    const idToUpdate = tokenDecodificated.id

    const rdxAppointment = useSelector(appointmentData)

    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);
    const [msgError, setMsgError] = useState();

    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState([]);

    const [Appointment, setAppointment] = useState({
        id: '',
        artist: '',
        Tattoo_artist: '',
        date: '',
        shift: '',
        type_work: '',
        description: ''
    })

    const [AppointmentError, setAppointmentError] = useState({
        idError: '',
        artistError: '',
        Tattoo_artistError: '',
        dateError: '',
        shiftError: '',
        type_workError: '',
        descriptionError: ''
    })

    useEffect(() => {
        for (let test in Appointment) {
            if (Appointment[test] === "") {
                setAppointment(rdxAppointment.credentialAppointment)
            }
        }
    }, [Appointment]);

    useEffect(() => {
        console.log (artists)
        if (artists.length===0) {
            GetArtist()
                .then(
                    results => {
                         setArtists(results.data.data)
                     }
                )
                .catch(error => console.log(error))
        } else {
            console.log("artists vale...", artists)
        }
    }, [artists]);


    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }


    const sendData = async () => {
        try {
            for (let test in Appointment) {
                if (Appointment[test] === "") return; }

            for (let test in AppointmentError) { 
                if (AppointmentError[test] !== "") return; }

            const body = {
                id: Appointment.id,
                user_id: idToUpdate,
                artist_id: Appointment.artist,
                date: Appointment.date,
                shift: Appointment.shift,
                type_work: Appointment.type_work,
                description: Appointment.description,
            };
            console.log(token)
            console.log(body)

            const response = await updateAppointmentById(body, token);

            setMsgError(response.data.message)
            console.log(response)
            setTimeout(() => {
                setIsEnabled(true)
                navigate("/AppointmentsProfile");
            }, 1000);
        }
        catch (error) { console.log(error) }
    };

    return (
        <div className="appointmentDesign">
            <div><img className="logoDesign" src={"./img/logo.png"} /></div>

           
            <div>Tattoo artist :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.Tattoo_artistError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"Tattoo_artist"}
                    value={Appointment.Tattoo_artist}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {
                artists.length>0 &&
                <select name="artist" onChange={functionHandler}>
                    <option>Select an artist</option>
                    {
                        artists.map(
                            artist => {
                                return (
                                    <option key={artist.id}value={artist.id}>{artist.name}</option>
                                )
                            }
                        )
                    }
                </select>
            }
                <div className='errorMsg'>{AppointmentError.Tattoo_artistError}</div>
            </div>

            <div>Date :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
                    type={"date"}
                    name={"date"}
                    value={Appointment.date}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.dateError}</div>
            </div>

            <div>Shift :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.shiftError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"shift"}
                    value={Appointment.shift}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <select name="shift" onChange={functionHandler}>
                    <option>Select an shift</option>
                    <option value='Mañana'>Mañana </option> 
                    <option value='Tarde'>Tarde</option>
                </select>
                <div className='errorMsg'>{AppointmentError.shiftError}</div>
            </div>

            <div>Type work :
                {Appointment.type_work} 
                {/* <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.type_workError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"type_work"} */}
                    {/* functionProp={functionHandler}
                    functionBlur={errorCheck}
                /> */}
                <select name="type_work" onChange={functionHandler}>
                    <option>Select an type work</option>
                    <option value='Tattoo'>Tattoo </option> 
                    <option value='Piercing'>Piercing</option>
                </select>
               
                <div className='errorMsg'>{AppointmentError.type_workError}</div>
            </div>

            <div>Description :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.descriptionError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"description"}
                    value={Appointment.description}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.descriptionError}</div>

                <div className='errorMsg'>{msgError}</div>

            </div>
            
            {
                isEnabled
                    ? (<div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)

                    : (<div className="buttonSubmit" onClick={() => sendData()}>UPDATE DATA</div>)
            }
        </div>
    );
}

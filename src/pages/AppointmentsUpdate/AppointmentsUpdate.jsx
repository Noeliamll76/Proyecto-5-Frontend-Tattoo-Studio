
import React, { useState, useEffect } from 'react';
import './AppointmentsUpdate.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { appointmentData } from "../../pages/appointmentSlice";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';

export const AppointmentsUpdate = () => {

    const rdxAppointment = useSelector(appointmentData)
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token
    const tokenDecodificated = jwtDecode(token)
    const idToUpdate = tokenDecodificated.id
   
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);
    const [msgError, setMsgError] = useState();

    const [Appointment, setAppointment] = useState({
        id: '',
        artist_id: '',
        Tattoo_artist:'',
        date: '',
        shift: '',
        type_work: '',
        description: ''
    })
    
    const [AppointmentError, setAppointmentError] = useState({
        idError: '',
        artist_idError: '',
        Tattoo_artistError: '',
        dateError: '',
        shiftError: '',
        type_workError: '',
        descriptionError: ''
    })

    useEffect(() => {
        setAppointment(rdxAppointment)
        console.log(Appointment)
    }, [Appointment]);


    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const sendData = async () => {
        try {
            console.log(Appointment)
            for (let test in Appointment) { if (Appointment[test] === "") return; }
            for (let test in AppointmentError) { if (AppointmentError[test] !== "") return; }
            
            const body = {
                user_id: idToUpdate,
                artist_id: Appointment.artist_id,
                date: Appointment.date,
                shift: Appointment.shift,
                type_work: Appointment.type_work,
                description: Appointment.description,

            };
            const response = await updateAppointmentById(idToUpdate, body, token);
            
            setMsgError(response.data.message)
            console.log (response)
            console.log (msgError)
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
            
            <div>Id tattoo artist :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.artist_idError !== "" ? 'inputDesignError' : ''}`}
                    type={"number"}
                    name={"artist_id"}
                    value={Appointment.credentialAppointment.artist_id}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.artist_idError}</div>
            </div>

            <div>Tattoo artist :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.Tattoo_artistError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"Tattoo_artist"}
                    value={Appointment.credentialAppointment.Tattoo_artist}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.Tattoo_artistError}</div>
            </div>
            <div>Date :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
                    type={"date"}
                    name={"date"}
                    value={Appointment.credentialAppointment.date}
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
                    value={Appointment.credentialAppointment.shift}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.shiftError}</div>
            </div>

            <div>Type work :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.type_workError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"type_work"}
                    value={Appointment.credentialAppointment.type_work}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.type_workError}</div>
            </div>

            <div>Description :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.descriptionError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"description"}
                    value={Appointment.credentialAppointment.description}
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

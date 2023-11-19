
import React, { useState, useEffect } from 'react';
import './AppointmentsUpdate.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { appointmentData} from "../../pages/appointmentSlice";

export const AppointmentsUpdate = () => {

    const rdxAppointment = useSelector(appointmentData);
console.log (rdxAppointment)
console.log (appointmentData)
console.log (useSelector(appointmentData))

    
    // const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);
    const [msgError, setMsgError] = useState();

    const [Appointment, setAppointment] = useState({
        user_id: '',
        artist_id: '',
        date: '',
        shift: '',
        type_work: '',
        description: ''
    })

    const [AppointmentError, setAppointmentError] = useState({
        user_idError: '',
        artist_idError: '',
        dateError: '',
        shiftError: '',
        type_workError: '',
        descriptionError: ''
    })

    useEffect(() => {
        console.log(Appointment);
    }, [Appointment]);

    setAppointment(rdxAppointment)

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
            console.log (Appointment)
    //         for (let test in Appointment) { if (Appointment[test] === "") return; }
    //         for (let test in ProfileError) { if (ProfileError[test] !== "") return; }

    //         const body = {
    //             name: Profile.name,
    //             email: Profile.email,
    //             phone: Profile.phone,
    //         };
    //         const response = await updateUser(body, token);
    //         setMsgError(response.data.message)
    //         setTimeout(() => {
    //             setIsEnabled(true)
    //             navigate("/");
    //         }, 1000);
        }
        catch (error) { console.log(error) }
    };


    return (
        <div className="appointmentDesign">
            <div><img className="logoDesign" src={"./img/logo.png"} /></div>

            <div>User id :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign`}
                    type={"number"}
                    name={"user_id"}
                    value={Appointment.user_id}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.user_idError}</div>
            </div>

            <div>Id tattoo artist :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.artist_idError !== "" ? 'inputDesignError' : ''}`}
                    type={"number"}
                    name={"artist_id"}
                    value={Appointment.artist_id}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{AppointmentError.artist_idError}</div>
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
                <div className='errorMsg'>{AppointmentError.shiftError}</div>
            </div>

            <div>Type work :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${AppointmentError.type_workError !== "" ? 'inputDesignError' : ''}`}
                    type={"text"}
                    name={"type_work"}
                    value={Appointment.type_work}
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

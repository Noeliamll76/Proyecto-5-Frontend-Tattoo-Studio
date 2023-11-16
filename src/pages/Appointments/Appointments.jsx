
import React, { useState, useEffect } from 'react';
import './Appointments.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerAppointment } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



export const Appointments = () => {

  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    
    artist_id: '',
    date: '',
    shift: '',
    type_work: '',
    description: ''
  });

  const [appointmentError, setAppointmentError] = useState({
    artist_idError: '',
    dateError: '',
    shiftError: '',
    type_workError: '',
    descriptionError: ''
  });

  const functionHandler = (e) => {
    setAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = (e) => {
    let error = ""
    error = validator(e.target.name, e.target.value);
    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
    
  }

  const Submit = () => {

    for (let test1 in user) {
      if (user[test1] === "") {
        return;
      }
    }

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }
    registerAppointment(appointment)
      .then(
        resultado => {
          console.log(resultado)
          setTimeout(() => {
            navigate("/");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="appointmentDesign">
      <CustomInput
        design={`inputDesign ${appointmentError.artist_idError !== "" ? 'inputDesignError' : ''}`}
        type={"number"}
        name={"artist_id"}
        placeholder={"Name tattoo artist"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.artist_idError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
        type={"date"}
        name={"date"}
        placeholder={"aaaa/mm/dd"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.dateError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.shiftError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"shift"}
        placeholder={"mañanas o tardes"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.shiftError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.type_workError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"type_work"}
        placeholder={"type work"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.type_workError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.descriptionError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"description"}
        placeholder={"description, size and tattoo location"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.descriptionError}</div>
      <div className='buttonSubmit' onClick={Submit}>Check in?</div>
    </div>
  )
}
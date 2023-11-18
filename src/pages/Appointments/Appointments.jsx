
import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerAppointment } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from "react-redux";
import { login, appointmentData } from "../../pages/appointmentSlice";
import { userData } from "../../pages/userSlice";


export const Appointments = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxuser = useSelector(userData);
  const rdxAppointment = useSelector(appointmentData);

  const token = { headers: { Authorization: `Bearer ${rdxuser.credentials.token}` } }

  const [appointment, setAppointment] = useState({
    user_id: '',
    artist_id: '',
    date: '',
    shift: '',
    type_work: '',
    description: ''
  });

  const [appointmentError, setAppointmentError] = useState({
    user_idError: '',
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
    for (let test in appointment) {
      if (appointment[test] === "") {
        return;
      }
    }

    for (let test in appointmentError) {
      if (appointmentError[test] !== "") {
        return;
      }
    }
    registerAppointment(token, appointment)
      .then(
        resultado => {
          if (resultado.data.message !== "Appointment created"){
            setMsgError("Incorrect data or existing appointment")
            return;
          }
          setTimeout(() => {
            navigate("/");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="appointmentDesign">
      <div>User id :
        <CustomInput
        design={`inputDesign ${appointmentError.artist_idError !== "" ? 'inputDesignError' : ''}`}
        type={"number"}
        name={"user_id"}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.artist_idError}</div>
        </div>
      <div>Id tattoo artist :
        <CustomInput
        design={`inputDesign ${appointmentError.artist_idError !== "" ? 'inputDesignError' : ''}`}
        type={"number"}
        name={"artist_id"}
      
        functionProp={functionHandler}
        functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.artist_idError}</div>
        </div>
        <div>Date :
        <CustomInput
        design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
        type={"date"}
        name={"date"}
        
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.dateError}</div>
      </div>
      <div>Shift :
        <CustomInput
        design={`inputDesign ${appointmentError.shiftError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"shift"}
        
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.shiftError}</div>
      </div>
      <div>Type work :
        <CustomInput
        design={`inputDesign ${appointmentError.type_workError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"type_work"}
       
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.type_workError}</div>
      </div>
      <div>Description :
        <CustomInput
        design={`inputDesign ${appointmentError.descriptionError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"description"}
       
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.descriptionError}</div>
      </div>
      <div className='buttonSubmit' onClick={Submit}>Check in?</div>
    </div>
  )
}
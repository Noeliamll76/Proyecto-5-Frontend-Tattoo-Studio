
import React, { useState, useEffect } from 'react';
import './AppointmentsCreate.css';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerAppointment } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";


export const AppointmentsCreate = () => {

  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const appointmentIdUser = (rdxUser.credentials.data.id)

  const token = { headers: { Authorization: `Bearer ${rdxUser.credentials.token}` } }

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

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);

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
    console.log(setAppointmentError)
  }

  const Submit = () => {

    for (let test in appointment) {
      if (appointment[test] === "") {
    console.log (appointment)

        return;
      }
    }
    for (let test in appointmentError) {
      if (appointmentError[test] !== "") {
        return;
      }
    }
    console.log (appointment)
    console.log (appointmentError)
    console.log (token)
    // registerAppointment(token, appointment)
    registerAppointment(appointment)
      .then(resultado => {
        if (resultado.data.message === "Appointment created") {
          setTimeout(() => {
            console.log("Cita creada correctamente")
            navigate("/");
          }, 500)
        }
        setMsgError(resultado.data.message)
        console.log(resultado, data.message)
        return;
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="appointmentDesign">
      <div><img className="logoDesign" src={"./img/logo.png"} /></div>
      <div>User id :
        <CustomInput
          design={`inputDesign ${appointmentError.user_idError !== "" ? 'inputDesignError' : ''}`}
          type={"number"}
          name={"user_id"}
          // value={appointmentIdUser}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{appointmentError.user_idError}</div>
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

import React, { useState, useEffect } from 'react';
import './AppointmentsCreate.css';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerAppointment, GetArtist } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";


export const AppointmentsCreate = () => {

  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const appointmentIdUser = (rdxUser.credentials.data.id)
  const [msgError, setMsgError] = useState();

  const [artists, setArtists] = useState([]);

  const token = rdxUser.credentials.token

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

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);

  useEffect(() => {
    console.log(artists)
    if (artists.length === 0) {
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
        return;
      }
    }
    for (let test in appointmentError) {
      if (appointmentError[test] !== "") {
        return;
      }
    }
    const body = {
      user_id: token.id,
      artist_id: appointment.artist_id,
      date: appointment.date,
      shift: appointment.shift,
      type_work: appointment.type_work,
      description: appointment.description
    }

    registerAppointment(body, token)
      .then(resultado => {
        if (resultado.data.message === "Appointment created") {
          setTimeout(() => { return ("Cita creada correctamente") }, 500)
          navigate("/");
        }
      })
      .catch(error);
    console.log(error)
      ;
  }

  return (
    <div className="appointmentDesign">
      <div className='errorMsg'>{msgError}</div>
      <div><img className="logoDesign" src={"./img/logo.png"} /></div>

      <div>Tattoo artist :
        {
          <select name="artist_id" onChange={functionHandler}>
            <option>Select an artist</option>
            {
              artists.map(
                artist_id => {
                  return (
                    <option key={artist_id.id} value={artist_id.id}>{artist_id.name}</option>
                  )
                }
              )
            }
          </select>
        }
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
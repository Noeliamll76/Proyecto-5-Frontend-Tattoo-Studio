
import React, { useState, useEffect } from 'react';
import './CreateArtist.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerArtist } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { useSelector} from "react-redux";  
import { userData } from "../../pages/userSlice";

export const CreateArtist = () => {

  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const token = (rdxUser.credentials.token);
  console.log (rdxUser.credentials.token);
  console.log (token);
  
  const [msgError, setMsgError] = useState('');

  const [artist, setArtist] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [artistError, setArtistError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: ''
  });

  const functionHandler = (e) => {
    setArtist((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setMsgError("")
  };

  const errorCheck = (e) => {
    let error = ""
    error = validator(e.target.name, e.target.value);
    setArtistError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }

  const Submit = () => {
    for (let test in artist) {
      if (artist[test] === "") {
        return;
      }
    }
    for (let test in artistError) {
      if (artistError[test] !== "") {
        return;
      }
    }
    registerArtist(artist, token)
      .then( resultado => {
          if (resultado.data.message === "Incorrect data"){
            setMsgError("Incorrect data or existing artist")
            return;
          }
          setTimeout(() => {
            navigate("/superAdmin");
          }, 500)
        }
        
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="registerDesign">
      <div><img className="logoDesign" src={"./img/logo.png"} /></div>
      <div>Artist name :
        <CustomInput
          design={`inputDesign ${artistError.nameError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"name"}
          placeholder={"Name and surname"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{artistError.nameError}</div>
      </div>

      <div>Artist email :
        <CustomInput
          design={`inputDesign ${artistError.emailError !== "" ? 'inputDesignError' : ''}`}
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{artistError.emailError}</div>
      </div>

      <div>Password :
        <CustomInput
          design={`inputDesign ${artistError.passwordError !== "" ? 'inputDesignError' : ''}`}
          type={"password"}
          name={"password"}
          placeholder={"password min 8 characters"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{artistError.passwordError}</div>
      </div>

      <div>Phone number :
        <CustomInput
          design={`inputDesign ${artistError.phoneError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"phone"}
          placeholder={"phone"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{artistError.phoneError}</div>
      </div>

      <div className='errorMsg'>{msgError}</div>

      <div className='buttonSubmit' onClick={Submit}>Check in?</div>
    </div>
  )
}
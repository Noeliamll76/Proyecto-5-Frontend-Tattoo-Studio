
import React, { useState, useEffect } from 'react';
import './Register.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';


export const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: ''
  });

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = (e) => {
    let error = ""
    error = validator(e.target.name, e.target.value);
    setUserError((prevState) => ({
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
    registerUser(user)
      .then(
        resultado => {
          //si todo ha ido bien, redirigiremos a login...
          console.log(resultado)
          setTimeout(() => {
            navigate("/login");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="registerDesign">
      <div><img className="logoDesign" src={"./img/logo.png"} /></div>
      <div>Nombre de usuario :
        <CustomInput
          design={`inputDesign ${userError.nameError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"name"}
          placeholder={"Name and surname"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.nameError}</div>
      </div>

      <div>Email de usuario :
        <CustomInput
          design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.emailError}</div>
      </div>

      <div>Password :
        <CustomInput
          design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
          type={"password"}
          name={"password"}
          placeholder={"password min 8 characters"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.passwordError}</div>
      </div>

      <div>Phone number :
        <CustomInput
          design={`inputDesign ${userError.phoneError !== "" ? 'inputDesignError' : ''}`}
          type={"text"}
          name={"phone"}
          placeholder={"phone"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.phoneError}</div>
      </div>

      <div className='buttonSubmit' onClick={Submit}>Check in?</div>
    </div>
  )
}
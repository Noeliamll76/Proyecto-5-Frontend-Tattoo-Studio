
import React, { useState, useEffect} from 'react';
import './Register.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";


export const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        phoneError: "",
      });

    const functionHandler = (e) => {
        setUser((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };

      const errorCheck = (e) => {
        let error=""
        error=validator(e.target.name, e.target.value);
      }
      


     return (
         <div className="registerDesign">       
            <CustomInput
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
                />
                <div>{userError.emailError}</div>
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
                />
                <CustomInput
                design={"inputDesign"}
                type={"text"}
                name={"name"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
                />
                <CustomInput
                design={"inputDesign"}
                type={"text"}
                name={"phone"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
                />
         </div>
     )
     }
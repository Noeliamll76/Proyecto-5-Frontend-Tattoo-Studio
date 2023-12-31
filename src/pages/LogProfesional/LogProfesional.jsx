
import React, { useState, useEffect } from 'react';
import './LogProfesional.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logTattooArtist } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { useDispatch } from "react-redux";  
import { login } from "../artistSlice";

export const LogProfesional = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [msgError, setMsgError] = useState('');
    const [credenciales, setCredenciales] = useState({
        email: "",
        password: "",
    });

    const [credencialesError, setCredencialesError] = useState({
        emailError: '',
        passwordError: '',
    })

    const functionHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setCredencialesError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    useEffect(() => {
        console.log(credenciales);
    }, [credenciales]);

    const logMe = () => {
        for (let test1 in credenciales) {
            if (credenciales[test1] === "") {
                return;
            }
        }
        for (let test in credencialesError) {
            if (credencialesError[test] !== "") {
                return;
            }
        }
        logTattooArtist(credenciales)
        .then(resultado => {
            dispatch(login({ credentials: resultado.data }))
            setTimeout(() => {
                navigate("/artistAppointments");
            }, 500);
        })
        .catch(error => {
             setMsgError(error.message)
        });
    }
    
    return (
        <div className="loginDesign">
            <div>Email :
            <CustomInput
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={"email"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='errorMsg'>{credencialesError.emailError}</div>
            </div>

            <div>Password :
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={"password min 4 characters"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='errorMsg'>{credencialesError.passwordError}</div>
            </div>

            <div className='buttonSubmit' onClick={logMe}>Log Me!</div>
            <div>{msgError}</div>
        </div>
    )
}
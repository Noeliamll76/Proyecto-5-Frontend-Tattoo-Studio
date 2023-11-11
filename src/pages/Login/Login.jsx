
import React, { useState, useEffect } from 'react';
import './Login.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";


export const Login = () => {

    const navigate = useNavigate();
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
        logUser(credenciales)
            .then(resultado => {
                localStorage.setItem("token", (resultado.data.token))
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                setMsgError(error.message)
            });
    }

    return (
        <div className="loginDesign">
            <CustomInput
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='buttonSubmit' onClick={logMe}>Log Me!</div>
            <div>{msgError}</div>
        </div>
    )
}
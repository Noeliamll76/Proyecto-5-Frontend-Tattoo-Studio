
import React, { useState, useEffect } from 'react';
import './Login.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const navigate = useNavigate();


    const [credenciales, setCredenciales] = useState({
        email: "",
        password: "",
    });

    const functionHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    //   useEffect(()=>{
    //     console.log(credenciales);
    //   },[credenciales]);

    const logMe = () => {

        logUser(credenciales)
            .then(resultado => {
                localStorage.setItem("token", (resultado.data.token))
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } )
            .catch(error => console.log(error));
    }

    return (
        <div className="loginDesign">
            <CustomInput
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={""}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={""}
                functionProp={functionHandler}
            />
            <div className='buttonSubmit' onClick={logMe}>Log Me!</div>

        </div>

    )
}
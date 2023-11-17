
import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { GetUser } from "../../services/apiCalls";
import { updateUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { Navigate, useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";


export const Profile = () => {

    const rdxUser = useSelector(userData);

    const [Profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        created_at: "",
    })

    const [ProfileError, setProfileError] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        phoneError: '',
        roleError: '',
        created_atError: '',
    })

    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        console.log(rdxUser);
    }, [rdxUser]);

    useEffect(() => {
        for (let test1 in Profile) {
            if (Profile[test1] === "") {
                GetUser(rdxUser.credentials.token)
                    .then((results) => {
                        console.log(results)
                        setProfile(results.data.data);
                    })
                    .catch((error) => console.log(error));
            }
            console.log(Profile)
        } [Profile]
    });

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setProfileError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const functionHandler = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const sendData = () => {
        console.log(rdxUser.credentials.token)
        console.log(Profile)
        updateUser(rdxUser.credentials.token, Profile)
            .then((resultsUpdate) => {
                console.log (resultsUpdate)
                setTimeout(() => {
                    setIsEnabled(true)
                    console.log("ha realizado el update")
                    Navigate("/")
                }, 1000)
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="profileDesign">
            <div><img className="logoDesign" src={"./img/logo.png"} /></div>

            <div>Nombre de usuario :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    name={"name"}
                    placeholder={Profile.name}
                    value={Profile.name}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{ProfileError.nameError}</div>
            </div>

            <div>Email :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"email"}
                    name={"email"}
                    placeholder={Profile.email}
                    value={Profile.email}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{ProfileError.emailError}</div>
            </div>

            <div>Password :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.passwordError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    name={"password"}
                    placeholder={Profile.password}
                    value={Profile.password}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{ProfileError.passwordError}</div>
            </div>

            <div>Phone :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.phoneError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    name={"phone"}
                    placeholder={Profile.phone}
                    value={Profile.phone}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{ProfileError.phoneError}</div>
            </div>
            {
                isEnabled
                    ? (<div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)

                    : (<div className="buttonSubmit" onClick={() => sendData()}>UPDATE DATA</div>)
            }
        </div>
    );
}

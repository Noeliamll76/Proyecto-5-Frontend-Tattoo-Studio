
import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { GetUser } from "../../services/apiCalls";
import { updateUser } from "../../services/apiCalls";
import { logUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { login } from "../userSlice";


export const Profile = () => {

    const rdxUser = useSelector(userData);
    const token = { headers: { Authorization: `Bearer ${rdxUser.credentials.token}` } }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        // password: "",
        // role: "",
        // created_at: "",
    })

    const [ProfileError, setProfileError] = useState({
        nameError: '',
        emailError: '',
        phoneError: '',
        // passwordError: '',
        // roleError: '',
        // created_atError: '',
    })

    const [credenciales, setCredenciales] = useState();

    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        console.log(rdxUser);
    }, [rdxUser]);

    useEffect(() => {
        for (let test1 in Profile) {
            if (Profile[test1] === "") {
                GetUser(token)
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
        for (let test1 in Profile) {
            if (Profile[test1] === "") {
                return;
            }
        }
        for (let test in ProfileError) {
            if (ProfileError[test] !== "") {
                return;
            }
        }
        updateUser(token, Profile)
            .then((resultsUpdate) => {
                console.log(resultsUpdate)
                console.log(Profile)
                console.log("ha realizado el update")
                // setCredenciales({Profile.name, Profile.email})
                // console.log(credenciales)

                // logUser(credenciales)
                // .then(resultado => {
                // console.log(credenciales)
                dispatch(login({ credentials: "" }))
                setTimeout(() => {
                    setIsEnabled(true)
                    navigate("/");
                }, 1000);
            })
            // .catch(error => {
            //     setMsgError(error.message)
            // });
            .catch((error) => console.log(error));
    }


    return (
        <div className="profileDesign">
            <div><img className="logoDesign" src={"./img/logo.png"} /></div>

            <div>Nombre :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    name={"name"}
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
                    value={Profile.email}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{ProfileError.emailError}</div>
            </div>

            <div>Phone :
                <CustomInput
                    disabled={isEnabled}
                    design={`inputDesign ${ProfileError.phoneError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    name={"phone"}
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

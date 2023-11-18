
import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { GetUser, updateUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";


export const Profile = () => {

    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token

    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);
    const [msgError, setMsgError] = useState();

    const [Profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const [ProfileError, setProfileError] = useState({
        nameError: '',
        emailError: '',
        phoneError: '',
    })

    useEffect(() => {
        console.log(rdxUser);
    }, [rdxUser]);

    useEffect(() => {
        setMsgError("")
        for (let test in Profile) {
            if (Profile[test] === "") {
                GetUser(token)
                    .then((results) => {
                        console.log(results)
                        setProfile(results.data.data);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [Profile]);


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


    const sendData = async () => {
        try {
            for (let test in Profile) {
                if (Profile[test] === "") return;
            }
            for (let test in ProfileError) {
                if (ProfileError[test] !== "") return;
            }
            const body = {
                name: Profile.name,
                email: Profile.email,
                phone: Profile.phone,
            };
            console.log(token)
            console.log(body)
            const response = await updateUser(body, token);
            if (response.data.message !== "user update") {
                setMsgError(response.data.message)
                console.log(response.data.message)
                return;
            }
            console.log(resultsUpdate)
            console.log(Profile)
            setTimeout(() => {
                setIsEnabled(true)
                navigate("/");
            }, 500);
        }
        catch (error) { console.log(error) }
    };


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

                <div className='errorMsg'>{msgError}</div>

            </div>
            {
                isEnabled
                    ? (<div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)

                    : (<div className="buttonSubmit" onClick={() => sendData()}>UPDATE DATA</div>)
            }
        </div>
    );
}

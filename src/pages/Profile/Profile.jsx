
import React, { useState, useEffect } from 'react';
import './Profile.css'
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { GetUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";


import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";


export const Profile = () => {

    const rdxUser = useSelector(userData);

    const [Profile, setProfile] = useState({
        userName: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        created_at: "",
    })

    const [ProfileError, setProfileError] = useState({
        userNameError: '',
        emailError: '',
        passwordError: '',
        phoneError: '',
        roleError: '',
        created_atError: '',
    })

    const [isEnabled, setIsEnabled] = useState(true);
    const configToken = {
        headers: { Authorization: `Bearer ${rdxUser.credentials.token}` }
    };

    useEffect(() => {
        console.log(rdxUser);
    }, [rdxUser]);

    useEffect(() => {
        //  if (Profile.length === 0) {
            GetUser(configToken)
            console.log (rdxUser.credentials.token)
            .then((results) => {
                setProfile(results.data.data);
            })
            .catch((error) => console.log(error));
        //  }
        console.log (Profile)
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

    const updateUser = () => {
        updateUser(rdxUser.credentials.token, results.data.data)
        setTimeout(() => {
            setIsEnabled(true)
        }, 1000)
    }

    return (
        <div className="ProfileDesign">
            <CustomInput
                disabled={isEnabled}
                design={`inputDesign ${ProfileError.userNameError !== ""
                    ? "inputDesignError"
                    : ""
                    }`}
                type={"text"}
                name={"name"}
                placeholder={""}
                value={Profile.userName}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <CustomInput
                disabled={isEnabled}
                design={`inputDesign ${ProfileError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                type={"email"}
                name={"email"}
                placeholder={""}
                value={Profile.email}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <CustomInput
                disabled={isEnabled}
                design={`inputDesign ${ProfileError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                type={"password"}
                name={"password"}
                placeholder={""}
                value={Profile.password}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <CustomInput
                disabled={isEnabled}
                design={`inputDesign ${ProfileError.phoneError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                name={"phone"}
                placeholder={""}
                value={Profile.phone}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            {
                isEnabled
                    ? (<div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)

                    : (<div className="buttonSubmit" onClick={() => sendData()}>UPDATE DATA</div>)
            }
        </div>
    );
};

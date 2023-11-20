
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rdxCredentialsUser = useSelector(userData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/")
    }

    return (
        <div className="headerDesign">
            <LinkButton path={"/"} title={"Home"} />
            {!rdxCredentialsUser?.credentials.token ? (
                <>
                    <LinkButton path={"/register"} title={"Register"} />
                    <LinkButton path={"/login"} title={"Login"} />
                    <LinkButton path={"/logProfesional"} title={"Only professional"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title={rdxCredentialsUser.credentials.data.name} />
                    <LinkButton path={"/appointmentsCreate"} title={"New appointment"} />
                    <LinkButton path={"/appointmentsProfile"} title={"Yours appointments"} />

                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log out"} />
                    </div>
                </>
            )}
        </div>
    )
}
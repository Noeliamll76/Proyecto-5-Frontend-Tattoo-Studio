
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rdxCredentials = useSelector(userData);
console.log (`1 ${rdxCredentials.credentials.token}`)
    const logOutMe = () => {

        dispatch(logout({ credentials: "" }))

        navigate("/")

    }

    return (
        <div className="headerDesign">
            <LinkButton path={"/"} title={"Home"} />

            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton path={"/register"} title={"Register"} />
                    <LinkButton path={"/login"} title={"Login"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title= {rdxCredentials.credentials.Name} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            )}
        </div>
    )
}
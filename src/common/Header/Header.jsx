
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

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/")
    }

    return (
        <div className="headerDesign">
            <div></div>
            <div><img className='logoHeader' src={"./img/logo.png"} /></div>
            <LinkButton path={"/"} title={"Home"} />
            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton path={"/register"} title={"Register"} />
                    <LinkButton path={"/login"} title={"Login"} />
                    <LinkButton path={"/profesional"} title={"Only professional"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title={rdxCredentials.credentials.data.name} />

                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log out"} />
                    </div>
                </>
            )}
        </div>
    )
}
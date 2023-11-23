import React, { useState, useEffect } from 'react';
import { GetAllUsers } from '../../services/apiCalls';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { UserCard } from '../../common/UserCard/UserCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';
import "./UserList.css";

export const UserList = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const token = (rdxUser.credentials.token);
    const tokenDecodificated = jwtDecode(rdxUser.credentials.token);
    const role = tokenDecodificated.role

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (users.length === 0) {
            setTimeout(() => {
                GetAllUsers(token)
                    .then(
                        users => {
                            setUsers(users.data.data)
                            console.log(users.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }, 1000)
        }
    }, [users]);

    const callExitClick = () => { navigate("/superAdmin"); }

    return (
        <div className='usersDesign'>
            {role === "super_admin"
                ? (
                    users.length > 0 ? (
                        <div className='usersRoster'>
                            {users.map(user => {
                                return (
                                    <UserCard
                                        key={user.id}
                                        name={user.name}
                                        email={user.email}
                                        phone={user.phone}
                                    />)
                            })
                            }
                        </div>
                    )
                        : (
                            <div><LoadingSpinner /></div>
                        )
                )
                : (
                    navigate("/")
                )
            }
            <div className={`ExitSubmit `} onClick={callExitClick}>
                EXIT
            </div>
        </div>
    )
}
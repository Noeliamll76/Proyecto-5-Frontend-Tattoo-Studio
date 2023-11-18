
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Cards } from '../Cards/Cards';
import { Appointments } from '../Appointments/Appointments';
import { LogProfesional } from '../LogProfesional/LogProfesional';

export const Body = () => {
    return (
        <>
         <Routes>
            
            {/* <Route path="*" element={<Navigate to="/" />}/> */}
            <Route path="/" element={<Home />}/>
            <Route path="/cards" element={<Cards />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/appointments" element={<Appointments />}/>
            <Route path="/logProfesional" element={<LogProfesional />}/>
            </Routes>
         </>
     )
}
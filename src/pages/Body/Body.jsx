
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Cards } from '../Cards/Cards';
import { AppointmentsCreate } from '../AppointmentsCreate/AppointmentsCreate';
import { AppointmentsProfile } from '../AppointmentsProfile/AppointmentsProfile';
import { AppointmentsUpdate } from '../AppointmentsUpdate/AppointmentsUpdate';
import { LogProfesional } from '../LogProfesional/LogProfesional';
import { ArtistAppointments } from '../ArtistAppointments/ArtistAppointments';
import { SuperAdmin } from '../SuperAdmin/SuperAdmin';
import { UserList } from '../UserList/UserList';
import { CreateArtist } from '../CreateArtist/CreateArtist';
import { AllAppointments } from '../AllAppointments/AllAppointments';

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
            <Route path="/appointmentsCreate" element={<AppointmentsCreate />}/>
            <Route path="/appointmentsProfile" element={<AppointmentsProfile />}/>
            <Route path="/appointmentsUpdate" element={<AppointmentsUpdate />}/>
            <Route path="/logProfesional" element={<LogProfesional />}/>
            <Route path="/artistAppointments" element={<ArtistAppointments />}/>
            <Route path="/superAdmin" element={<SuperAdmin />}/>
            <Route path="/userList" element={<UserList />}/> 
            <Route path="/createArtist" element={<CreateArtist />}/> 
            <Route path='/allAppointments' element={<AllAppointments />}/>
            
            </Routes>
         </>
     )
}
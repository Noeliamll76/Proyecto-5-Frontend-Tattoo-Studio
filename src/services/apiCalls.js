
import axios from 'axios';

const hostURL = "http://localhost:4000"

export const registerUser = async (body) => {
   return await axios.post(`${hostURL}/user/register`, body);
}
export const logUser = async (body) => {
   return await axios.post(`${hostURL}/user/login`, body);
}
export const GetUser = async (token) => {
   return await axios.get(`${hostURL}/user/profile`, { headers: { Authorization: `Bearer ${token}` } });
}
export const updateUser = async (body, token) => {
   return await axios.put(`${hostURL}/user/updateUserByToken`, body, { headers: { Authorization: `Bearer ${token}`, }, })
}

export const GetArtist = async () => {
   return await axios.get(`${hostURL}/tattoo_artist/getAllTattooArtist`);
}

export const GetTattoo = async () => {
   return await axios.get(`${hostURL}/work/getAllWorks`);
} 

export const registerAppointment = async (body, token) => {
   return await axios.post(`${hostURL}/appointment/register`, body,
      { headers: { Authorization: `Bearer ${token}`, }, })
}
export const loginAppointmentsById = async (id) => {
   return await axios.post(`${hostURL}/appointment/loginAppointmentsById/${id}`)
}
export const updateAppointmentById = async (body, token) => {
   return await axios.put(`${hostURL}/appointment/updateAppointmentById`, body, { headers: { Authorization: `Bearer ${token}`, }, })
}
export const deleteAppointmentById = async (body, token) => {
return await axios.delete(`${hostURL}/appointment/deleteAppointmentById`, { headers: { Authorization: `Bearer ${token}` }, data: body });
}

export const logTattooArtist = async (body) => {
   return await axios.post(`${hostURL}/tattoo_artist/login`, body);
}
export const loginArtistAppointments = async (token) => {
   return await axios.get(`${hostURL}/appointment/loginArtistAppointments`, { headers: { Authorization: `Bearer ${token}` }, })
}
export const registerArtist = async (body, token) => {
   return await axios.post(`${hostURL}/tattoo_artist/register`, body,
   { headers: { Authorization: `Bearer ${token}`, }, })
}
export const GetAllUsers = async (token) => {
   return await axios.get(`${hostURL}/user/getAllUsers`, { headers: { Authorization: `Bearer ${token}` } });
}
export const getAllAppointments = async (token) => {
   return await axios.get(`${hostURL}/appointment/getAllAppointments`, { headers: { Authorization: `Bearer ${token}` } });
}

import axios from 'axios';

export const logUser = async (body) => {
   return await axios.post(`http://localhost:4000/user/login`, body);
}

export const registerUser = async (body) => {
      return await axios.post(`http://localhost:4000/user/register`, body);
   }

export const GetTattoo = async () => {
   return await axios.get(`http://localhost:4000/work/getAllWorks`);
}

export const GetUser = async (token) => {
   return await axios.get(`http://localhost:4000/user/profile`, token);
}

export const updateUser = async (body) => {
   return await axios.put(`localhost:4000/user/updateUserByToken`, token, body);
}

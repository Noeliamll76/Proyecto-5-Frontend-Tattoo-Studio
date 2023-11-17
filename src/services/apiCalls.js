
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

export const updateUser = async (token, body) => {
   return await axios.put(`http://localhost:4000/user/updateUserByToken`, {headers:{Authorization:`Bearer ${token}`}}, body);
}

export const registerAppointment = async (body) => {
   return await axios.post(`http://localhost:4000/appointment/register`, {headers:{Authorization:`Bearer ${token}`}});
}

export const logTattooArtist = async (body) => {
   return await axios.post(`http://localhost:4000/tattoo_artist/login`, body);
}

// export const deleteUser= async (id) => {
//    return await axios.delete(`http://localhost:4000/blackAlien/deleteuser`, {data : { id: id}})
//  }

// const deleteUser = (id) => {
//    deleteAUser(id).then((resultado) => {
//      console.log(resultado);
//      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//    });
//  };

import axios from 'axios';

export const logUser = async (body) => {

   return await axios.post(`http://localhost:4000/user/login`, body);

}
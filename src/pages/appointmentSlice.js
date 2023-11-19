import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
    name: 'dataAppointment',
    initialState: {
      dataAppoinment: {}
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

export const { login, logout } = appointmentSlice.actions;

export const dataAppointment = (state) => state.appointment;

export default appointmentSlice.reducer;
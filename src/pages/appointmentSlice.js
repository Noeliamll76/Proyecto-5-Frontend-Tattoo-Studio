import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
      credentialAppointment: {}
    },
    reducers: {
      loginAppointment: (state, action) => {
        console.log(action.payload)
        return {
          ...state,
          ...action.payload
        }
      },
      logoutAppointment: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

export const { loginAppointment, logoutAppointment} = appointmentSlice.actions;

export const appointmentData = (state) => state.appointment;

export default appointmentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const artistSlice = createSlice({
    name: 'artist',
    initialState: {
      credentials: {}
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

export const { login, logout } = artistSlice.actions;

export const artistData = (state) => state.artist;

export default artistSlice.reducer;
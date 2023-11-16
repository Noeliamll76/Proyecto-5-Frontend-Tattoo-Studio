
import { createSlice } from '@reduxjs/toolkit';

export const tattoo_artistSlice = createSlice({
    name: 'tattoo_artist',
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

export const { login, logout } = tattoo_artistSliceSlice.actions;

export const tattoo_artistData = (state) => state.tattoo_artist;

export default tattoo_artistSlice.reducer;
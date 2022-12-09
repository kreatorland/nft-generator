import { createSlice } from '@reduxjs/toolkit';
import { userService } from '../services/users.service';


export const authSlice = createSlice({
    name: "authentication",
    initialState: {
        loggingIn: false
    },
    reducers : {
        loginRequest: state => {
            state.loggingIn = true
        }
    }
});


const  { loginRequest } = authSlice.actions;

export const login = ( user ) => async (dispatch) => {
    try {
        await userService.login( user );
    } catch (error) {
        throw new Error(error);
    }
};

export const selectAuthState = state => state.authState.loggingIn;

export default authSlice.reducer;
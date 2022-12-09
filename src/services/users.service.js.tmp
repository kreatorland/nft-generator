import  { handleResponse } from '../utils';

import { API_BASE } from '../config/constants';

const login = async (email, password) => {
    const requestOptions = {
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    }
    const response = await fetch(`${API_BASE}/auth/login`, requestOptions);
    const user = await handleResponse(response);
    return user;
}



export const userService = {
    login
}
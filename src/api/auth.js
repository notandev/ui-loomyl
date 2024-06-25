import axios from 'axios';
const BASH_URL = 'https://api.ahmadjumhadi.my.id';
const token = localStorage.getItem('token');

export const setLogin = async (payload) => {
    try {
        console.log(payload);
        const response = await axios.post(`${BASH_URL}/auth/login`, payload,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const setRegister = async (payload) => {
    try {
        const response = await axios.post(`${BASH_URL}/auth/register`, payload,{
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BASH_URL}/auth/user`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
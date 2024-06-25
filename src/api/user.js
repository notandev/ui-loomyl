import axios from 'axios';
const BASH_URL = 'https://api.ahmadjumhadi.my.id';
const token =  localStorage.getItem('token');
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

export const getUserByToken = async (tokenn) => {
    try {
        const response = await axios.get(`${BASH_URL}/users/userByToken`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenn}`
        }});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEmail = async (payload) => {
    try {
        const response = await axios.put(`${BASH_URL}/users/updateEmail`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }catch (error) {
        return error
    }
}

export const updatePassword = async (payload) => {
    try {
        const response = await axios.put(`${BASH_URL}/users/updatePassword`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }catch (error) {
        return error
    }
}

export const updateUsername = async (payload) => {
    try {
        const response = await axios.put(`${BASH_URL}/users/updateUsername`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }catch (error) {
        return error
    }
}
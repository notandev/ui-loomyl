
import axios from "axios";
const BASH_URL = 'https://api.ahmadjumhadi.my.id';

export const getComunity = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${BASH_URL}/communities`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const createComunity = async (payload) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${BASH_URL}/communities`, payload, {
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

export const getComunityById = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${BASH_URL}/communities/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteComunity = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`${BASH_URL}/communities/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
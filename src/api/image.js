import axios from "axios";
const BASH_URL = 'https://api.ahmadjumhadi.my.id';

export const getImageByUserId = async (id) => {
    try {
        const response = await axios.get(`${BASH_URL}/images/user/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const postImage = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASH_URL}/images`, payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const putImage = async (id, payload) => {
    console.log(id);
    console.log(payload);
    try {
        const response = await axios.put(`${BASH_URL}/images/${id}`, payload);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
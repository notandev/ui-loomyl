import axios from "axios";
const BASH_URL = 'https://api.ahmadjumhadi.my.id';

export const getCommentByCommunityId = async (id) => {
    try {
        const token =  localStorage.getItem('token');
        const response = await axios.get(`${BASH_URL}/comments/comunity/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const createComment = async (data) => {
    try {
        const token =  localStorage.getItem('token');
        const response = await axios.post(`${BASH_URL}/comments`, data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response
    } catch (error) {
        return error
    }
}

export const deleteComment = async (id) => {
    try {
        const token =  localStorage.getItem('token');
        const response = await axios.delete(`${BASH_URL}/comments/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response
    } catch (error) {
        return error
    }
}

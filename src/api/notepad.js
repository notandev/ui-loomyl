import axios from "axios";
const BASH_URL = 'https://api.ahmadjumhadi.my.id';
const token = localStorage.getItem('token');


export const getNotepad = async () => {
  try {
    const response = await axios.get(`${BASH_URL}/notepads`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export const getNotepadById = async (id) => {
  try {
    const response = await axios.get(`${BASH_URL}/notepads/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const createNotepad = async (payload) => {
  try {
    const response = await axios.post(`${BASH_URL}/notepads`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getNotepadByUserId = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASH_URL}/notepads/userId/${id}`, {
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

export const deleteNotepad = async (id) => {
  try {
    const response = await axios.delete(`${BASH_URL}/notepads/${id}`, {
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
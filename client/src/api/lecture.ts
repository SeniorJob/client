import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api`;

export const getPopularLecture = async () => {
  try {
    const response = await axios.get(`${API}/lectures/popular`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getLecture = async () => {
  try {
    const response = await axios.get(`${API}/lectures/filter`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api`;

export const getData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API}/${endpoint}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularLecture = async (params?: string) => {
  try {
    const res = await getData(`lectures/popular?${params}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getNewLecture = async (params?: string) => {
  try {
    const res = await getData(
      `lectures/filter?filter=latest&descending=true${params}`,
    );
    console.log(res.content);
    return res.content;
  } catch (err) {
    console.log(err);
  }
};

export const getLecture = async (params?: string) => {
  try {
    const res = await getData(`lectures/${params}`);
    console.log(res);
    return res.content ? res.content : res;
  } catch (err) {
    console.log(err);
  }
};

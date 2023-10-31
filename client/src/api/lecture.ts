import axios from 'axios';
import { LectureParamProps } from '../types/LectureTypes';

const API = `${import.meta.env.VITE_API_URL}/api`;

export const getData = async (
  endpoint?: string,
  params?: LectureParamProps,
) => {
  try {
    const response = await axios.get(`${API}/${endpoint}`, {
      params: params,
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularLecture = async (params?: LectureParamProps) => {
  try {
    const res = await getData(`lectures/popular?${params}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getNewLecture = async (params?: LectureParamProps) => {
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

// Lecture에 get 요청할 때 endpoint, params 필요
export const getLecture = async (
  endpoint?: string,
  params?: LectureParamProps,
) => {
  try {
    const res = await getData(`lectures/${endpoint}`, params);
    console.log(res);
    return res.content ? res.content : res;
  } catch (err) {
    console.log(err);
  }
};

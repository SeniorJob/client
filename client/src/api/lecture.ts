import axios from 'axios';
import { LectureParamProps } from '../types/LectureTypes';

const API = `${import.meta.env.VITE_API_URL}/api`;

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

instance.interceptors.request.use(config => {
  const token = `Bearer ${localStorage.getItem('accessToken')}`;
  config.headers.Authorization = token;

  return config;
});

export const applyLecture = async (
  lectureId: number | undefined,
  applyReason: string,
) => {
  try {
    const response = await instance.post(
      `/api/lectureapply/apply/${lectureId}?applyReason=${applyReason}`,
    );
    return response.data; // 요청이 성공하면 응답 데이터 반환
  } catch (error) {
    console.error('강의 신청 중 오류 발생:', error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달
  }
};

// 강의 목록 렌더링 관련 api
export const getData = async (
  endpoint?: string,
  params?: LectureParamProps,
) => {
  try {
    const response = await axios.get(`${API}${endpoint}`, {
      params: params,
    });
    // console.log(response.data);
    return response.data;
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
    const res = await getData(`/${endpoint}`, params);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// Detail fetch
export const getLectureDetail = async (endpoint?: string) => {
  try {
    const res = await getData(`${endpoint}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

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
  endPoint?: string,
  params?: LectureParamProps,
) => {
  try {
    const response = await axios.get(API + `/lectures/${endPoint}`, {
      params: params,
    });
    return response.data;
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

// 상단 배너 불러오기
export const getBanner = async () => {
  try {
    const response = await axios.get(API + '/banner');
    return response;
  } catch (err) {
    console.log(err, '배너 에러');
  }
};

// 사용자가 신청한 강의 id 불러오기
export const getAppliedLectureId = async () => {
  try {
    const response = await instance.get(`api/mypageApplyLecture/myApply`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err, '강의 아이디 불러오기 오류');
  }
};

// 강의 신청자 목록 불러오기
export const getAppliedMembers = async (params?: LectureParamProps) => {
  try {
    const response = await axios.get(API + '/lectureapply/list', {
      params: params,
    });
    return response;
  } catch (err) {
    console.log(err, '신청자 불러오기 오류');
  }
};

// 강의 신청자 승인상태 변경하기
export const modifyApplyStatus = async (params?: LectureParamProps) => {
  try {
    const response = await instance.put(API + '/lectureapply/approve', null, {
      params: params,
    });
    return response;
  } catch (err) {
    console.log(err, '승인 상태 변경 오류');
  }
};

// 강의 모집 마감하기
export const closeLecture = async (lectureId: number) => {
  try {
    const response = await instance.put(
      `${API}/lectureapply/close?lectureId=${lectureId}`,
    );
    return response;
  } catch (error) {
    console.error('강의 모집 마감 오류', error);
  }
};

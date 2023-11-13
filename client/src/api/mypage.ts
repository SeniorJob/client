import axios, { AxiosResponse } from 'axios';
import { GetLecturesResponse } from '../types/LectureTypes';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

instance.interceptors.request.use(config => {
  const token = `Bearer ${localStorage.getItem('accessToken')}`;
  config.headers.Authorization = token;

  return config;
});

// 회원 정보 확인
export const getProfile = async () => {
  return await instance
    .post('/api/users/detail')
    .then(res => res.data)
    .catch(err => err);
};

// 회원 정보 수정
export const updateProfile = async (formData: FormData) => {
  await instance
    .put('/api/users/update', formData)
    .then(() => (location.href = '/mypage'))
    .catch(err => err);
};

// 강좌 목록 + 필터링
export const getOpeningLectures = async (params: string) => {
  return await instance
    .get(`/api/mypageCreateLecture/filter?size=6&${params}`)
    .then((res: AxiosResponse<GetLecturesResponse>) => res)
    .catch(err => err);
};

export const getApplicationLectures = async (params: string) => {
  return await instance
    .get(`/api/mypageApplyLecture/filter?size=6&${params}`)
    .then((res: AxiosResponse<GetLecturesResponse>) => res)
    .catch(err => err);
};

export const getSuggestionLectures = async (params: string) => {
  return await instance
    .get(`/api/myProposalLecture/filter?size=6&${params}`)
    .then(res => res)
    .catch(err => err);
};

// 강좌 상세보기
export const getDetailOfCompletionLectures = (id: number) => {
  instance
    .get(`/api/mypageApplyLecture/myAppliedLectureDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getDetailOfOpeningLectures = (id: number) => {
  instance
    .get(`/api/mypageCreateLecture/myCreateLectureDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getDetailOfSuggestionLectures = (id: number) => {
  instance
    .get(`/api/myProposalLecture/myProposalDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
// !강좌 상세보기

type deleteLecture = {
  type: '개설' | '신청' | '제안';
  id?: number;
};

export const deleteLecture = async ({ type, id }: deleteLecture) => {
  type === '개설' &&
    (await instance
      .delete(`/api/lectures/delete/${id}`)
      .then(res => res)
      .catch(err => err));

  type === '신청' &&
    (await instance
      .delete(`/api/lectureapply/cancel/${id}`)
      .then(res => res)
      .catch(err => err));

  type === '제안' &&
    (await instance
      .delete(`/api/lectureproposal/delete/${id}`)
      .then(res => res)
      .catch(err => err));
};

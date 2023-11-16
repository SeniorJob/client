import axios, { AxiosResponse } from 'axios';
import {
  GetLecturesResponse,
  SuggestionLectureDto,
} from '../types/LectureTypes';

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
  return await instance
    .put('/api/users/update', formData)
    .then(res => res)
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
export const getDetailOfApplyLectures = (id?: number) => {
  return instance
    .get(`/api/mypageApplyLecture/myAppliedLectureDetail/${id}`)
    .then(res => res)
    .catch(err => err);
};
export const getDetailOfOpeningLectures = (id: number) => {
  return instance
    .get(`/api/mypageCreateLecture/myCreateLectureDetail/${id}`)
    .then(res => res)
    .catch(err => err);
};
export const getDetailOfSuggestionLectures = async (id: number) => {
  return await instance
    .get(`/api/myProposalLecture/myProposalDetail/${id}`)
    .then((res: AxiosResponse<SuggestionLectureDto>) => res)
    .catch(err => err);
};
// !강좌 상세보기

type updateApplyReason = {
  lectureId: number;
  newApplyReason: string;
};
export const updateApplyReason = ({
  lectureId,
  newApplyReason,
}: updateApplyReason) => {
  return instance
    .put(
      `/api/mypageApplyLecture/updateLectureApplyReason?lectureId=${lectureId}&newApplyReason=${newApplyReason}`,
      {
        lectureId,
        newApplyReason,
      },
    )
    .then(res => res)
    .catch(err => err);
};

type UpdateSuggestionLecture = {
  title: string;
  content: string;
  region: string;
  category: string;
};
export const updateSuggestionLecture = async (
  proposalId: number,
  data: UpdateSuggestionLecture,
) => {
  return await instance
    .put(`/api/lectureproposal/update/${proposalId}`, data)
    .then(res => res)
    .catch(err => err);
};

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
      .catch(err => {
        console.error(err);
        return err;
      }));
  type === '제안' &&
    (await instance
      .delete(`/api/lectureproposal/delete/${id}`)
      .then(res => res)
      .catch(err => err));
};
// response 받으려고 작성해놨던 함수
// export const deleteLecture = async ({ type, id }: deleteLecture) => {
//   try {
//     let response;

//     if (type === '개설') {
//       response = await instance.delete(`/api/lectures/delete/${id}`);
//     } else if (type === '신청') {
//       response = await instance.delete(`/api/lectureapply/cancel/${id}`);
//     } else if (type === '제안') {
//       response = await instance.delete(`/api/lectureproposal/delete/${id}`);
//     }

//     return response;
//   } catch (error) {
//     console.error('API 요청에 실패했습니다:', error);
//     throw error;
//   }
// };

type updateFirstStep_T = {
  create_id: number;
  formData: FormData;
};
export const updateFirstStep = async ({
  create_id,
  formData,
}: updateFirstStep_T) => {
  return instance
    .put(`/api/lectures/${create_id}`, formData)
    .then(res => res)
    .catch(err => {
      console.error(err);
      return err.response.data.errorMessage;
    });
};

type AddWeekTitle_T = {
  lectureId: number;
  title: string;
};
export const addWeekTitle = async ({ lectureId, title }: AddWeekTitle_T) => {
  return await instance
    .post(`/api/lecturesStepTwo/${lectureId}/weeks?title=${title}`)
    .then(res => res)
    .catch(err => err);
};
type UpdateWeekTitle_T = {
  title: string;
  weekId: number;
  lectureId: number;
};
export const updateWeekTitle = async ({
  title,
  weekId,
  lectureId,
}: UpdateWeekTitle_T) => {
  return await instance
    .put(
      `/api/lecturesStepTwo/${lectureId}/weeks/${weekId}/week-update?title=${title}`,
    )
    .then(res => res)
    .catch(err => err);
};
type DeleteWeekTitle_T = {
  createId: number;
  weekId: number;
};
export const deleteWeekTitle = async ({
  createId,
  weekId,
}: DeleteWeekTitle_T) => {
  return instance
    .delete(`/api/lecturesStepTwo/${createId}/weeks/${weekId}/week-delete`)
    .then(res => res)
    .catch(err => err);
};

type UpdateWeekPlan_T = {
  le_id?: number;
  weekId: number;
  planId: number;
  detail: string;
};
export const updateWeekPlan = async ({
  le_id,
  weekId,
  planId,
  detail,
}: UpdateWeekPlan_T) => {
  const content = detail.replace(/(\n|\r\n)/g, '<br>');

  return await instance
    .put(
      `/api/lecturesStepTwo/${le_id}/weeks/${weekId}/plans/${planId}/plan-update?detail=${content}`,
    )
    .then(res => res)
    .catch(err => err);
};

type AddWeekList_T = {
  lectureId: number;
  weekId: number;
  content: string;
};
export const addWeekList = async ({
  lectureId,
  weekId,
  content,
}: AddWeekList_T) => {
  const detail = content.replace(/(\n|\r\n)/g, '<br>');

  return await instance
    .post(
      `/api/lecturesStepTwo/lectures/${lectureId}/weeks/${weekId}/plans?detail=${detail}`,
    )
    .then(res => res)
    .catch(err => err);
};

type DeleteWeekList_T = {
  lectureId: number;
  weekId: number;
  planId: number;
};
export const deleteWeekList = async ({
  lectureId,
  weekId,
  planId,
}: DeleteWeekList_T) => {
  return instance
    .delete(
      `/api/lecturesStepTwo/${lectureId}/weeks/${weekId}/plans/${planId}/plan-delete`,
    )
    .then(res => res)
    .catch(err => err);
};

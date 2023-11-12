import axios from 'axios';

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
    .catch(err => console.error(err));
};

// 회원 정보 수정
export const updateProfile = async (formData: FormData) => {
  await instance
    .put('/api/users/update', formData)
    .then(() => (location.href = '/mypage'))
    .catch(err => console.error(err));
};

// 강좌 목록 + 필터링
export const getOpeningLectures = (params: string) => {
  return instance
    .get(`/api/mypageCreateLecture/filter?${params}`)
    .then(res => res.data.content)
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const getApplicationLectures = async () => {
  return await instance
    .get(`/api/mypageApplyLecture/filter?filter=latest&size=12&page=1`)
    .then(res => {
      console.log(res);
      return res.data.content;
    })
    .catch(err => err);
};

export const getSuggestionLectures = async () => {
  return await instance
    .get(
      `/api/myProposalLecture/filter?page=1&size=12&filter=latest&descending=true`,
    )
    .then(res => {
      console.log(res);
      return res.data.content;
    })
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

export const deleteLecture = async (create_id: number) => {
  await instance
    .delete(`/api/lectures/delete/${create_id}`)
    .then(res => {
      alert(res.data);
    })
    .catch(err => console.error(err));
};

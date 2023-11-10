import axios from 'axios';

// interface UpdateProfile_I {
//   name: string;
//   dateOfBirth: string;
//   job: string;
//   region: string;
//   category: string;
// }

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
export const getCompletionLectures = () => {
  instance
    .get(`/api/mypageApplyLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getOpeningLectures = () => {
  instance
    .get(`/api/mypageCreateLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getSuggestionLectures = () => {
  instance
    .get(`/api/myProposalLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
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

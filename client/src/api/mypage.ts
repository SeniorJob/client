import axios from 'axios';

interface UpdateProfile_I {
  name: string;
  dateOfBirth: string;
  job: string;
  region: string;
  category: string;
}

const BASEURL = `${import.meta.env.VITE_API_URL}`;

// 회원 정보 확인
export const getProfile = async () => {
  await axios
    .post(`${import.meta.env.VITE_API_URL}/api/users/detail`, {
      headers: {
        'Access-Control-Allow-Origin': `http://localhost:5173`,
        'Access-Control-Allow-Credentials': 'true',
      },
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

// 회원 정보 수정
export const updateProfile = (props: UpdateProfile_I) => {
  const data = {
    name: props.name,
    dateOfBirth: props.dateOfBirth,
    job: props.job,
    region: props.region,
    category: props.category,
  };

  axios
    .put(`${import.meta.env.VITE_API_URL}/api/users/update`, { data })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

// 강좌 목록 + 필터링
export const getCompletionLectures = () => {
  axios
    .get(`${BASEURL}/api/mypageApplyLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getOpeningLectures = () => {
  axios
    .get(`${BASEURL}/api/mypageCreateLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getSuggestionLectures = () => {
  axios
    .get(`${BASEURL}/api/myProposalLecture/filter`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

// 강좌 상세보기
export const getDetailOfCompletionLectures = (id: number) => {
  axios
    .get(`${BASEURL}/api/mypageApplyLecture/myAppliedLectureDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getDetailOfOpeningLectures = (id: number) => {
  axios
    .get(`${BASEURL}/api/mypageCreateLecture/myCreateLectureDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export const getDetailOfSuggestionLectures = (id: number) => {
  axios
    .get(`${BASEURL}/api/myProposalLecture/myProposalDetail/${id}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
// !강좌 상세보기

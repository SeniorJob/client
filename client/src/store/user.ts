import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  detail: {
    uid?: number;
    name?: string;
    phoneNumber?: string;
    encryptionCode?: string;
    confirmPassword?: string;
    job?: string;
    dateOfBirth?: string;
    category?: string;
    region?: string;
    imgKey?: string;
    updateDate?: string;
    createDate?: string;
  };
  setIsLoggedIn: () => void;
}

export const useUserStore = create<UserState>(set => ({
  isLoggedIn: false,
  detail: {
    uid: undefined,
    name: undefined,
    phoneNumber: undefined,
    encryptionCode: undefined,
    confirmPassword: undefined,
    job: undefined,
    dateOfBirth: undefined,
    category: undefined,
    region: undefined,
    imgKey: undefined,
    updateDate: undefined,
    createDate: undefined,
  },

  setIsLoggedIn: () =>
    set(prevState => ({ isLoggedIn: !prevState.isLoggedIn })),
}));

// "uid": 3,
// "name": "이현숙",
// "phoneNumber": "01022222222",
// "encryptionCode": "$2a$10$4AHzizpgQUcY36CKj/vzoOdV43Z7GKObMPq3hj4Sz/50X4YhKvJh2",
// "confirmPassword": null,
// "job": "한식요리사",
// "dateOfBirth": "1950-12-12",
// "category": "외식",
// "region": "경기도 안양시 만안구 안양대로123",
// "imgKey": "https://seniorjob-bucket.s3.amazonaws.com/eac515c2-28f4-4dce-acb5-628312197585_다운로드1.jpg",
// "updateDate": "2023-09-13T10:00:00",
// "createDate": "2023-10-19T19:50:51.746628"

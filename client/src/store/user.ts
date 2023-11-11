import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface UserState {
  isLoggedIn: boolean;
  userDetail: {
    uid: number | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    encryptionCode: string | undefined;
    job: string | undefined;
    dateOfBirth: string | undefined;
    category: string | undefined;
    region: string | undefined;
    imgKey: string | undefined;
    updateDate: string | undefined;
  };
  setIsLoggedIn: () => void;
  setUserDetail: (info: UserState['userDetail']) => void;
}

type UserPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>,
) => StateCreator<UserState>;

export const useUserStore = create<UserState>(
  (persist as UserPersist)(
    set => ({
      isLoggedIn: false,

      userDetail: {
        uid: undefined,
        name: undefined,
        phoneNumber: undefined,
        encryptionCode: undefined,
        job: undefined,
        dateOfBirth: undefined,
        category: undefined,
        region: undefined,
        imgKey: undefined,
        updateDate: undefined,
      },

      setIsLoggedIn: () =>
        set(prevState => ({ isLoggedIn: !prevState.isLoggedIn })),

      setUserDetail: info => set(() => ({ userDetail: info })),
    }),
    { name: 'UserStore' },
  ),
);

interface ModalState {
  loginModal: boolean;
  handleLoginModal: () => void;
}

export const useLoginModalStore = create<ModalState>(set => ({
  loginModal: false,
  handleLoginModal: () =>
    set(prevState => ({ loginModal: !prevState.loginModal })),
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

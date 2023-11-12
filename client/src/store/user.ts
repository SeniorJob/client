import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { LectureDto } from '../types/LectureTypes';

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

export interface LecturesState {
  myLectures: LectureDto[] | [];
  setMyLectures: (lectures: LectureDto[]) => void;
}

type LecturesPersist = (
  config: StateCreator<LecturesState>,
  options: PersistOptions<LecturesState>,
) => StateCreator<LecturesState>;

export const useLecturesStore = create<LecturesState>(
  (persist as LecturesPersist)(
    set => ({
      myLectures: [],

      setMyLectures: lectures => set(() => ({ myLectures: lectures })),
    }),
    { name: 'LecturesStore' },
  ),
);

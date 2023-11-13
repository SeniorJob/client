import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { LectureDto, SuggestionLectureDto } from '../types/LectureTypes';

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

export interface LecturesState {
  myOpeningLectures: LectureDto[];
  myApplicationLectures: LectureDto[];
  mySuggestionLectures: SuggestionLectureDto[];

  setMyOpeningLectures: (lectures: LectureDto[]) => void;
  setMyApplicationLectures: (lectures: LectureDto[]) => void;
  setMySuggestionLectures: (lectures: SuggestionLectureDto[]) => void;
}

export const useLecturesStore = create<LecturesState>(set => ({
  myOpeningLectures: [],
  mySuggestionLectures: [],
  myApplicationLectures: [],

  setMyOpeningLectures: lectures =>
    set(() => ({ myOpeningLectures: lectures })),
  setMyApplicationLectures: lectures =>
    set(() => ({ myApplicationLectures: lectures })),
  setMySuggestionLectures: lectures =>
    set(() => ({ mySuggestionLectures: lectures })),
}));

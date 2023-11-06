export type LectureDataProps = {
  data: LectureProps;
};

export type LectureParamProps = {
  page?: number;
  size?: number;
  title?: string;
  filter?: string;
  descending?: boolean;
  region?: string;
  status?: string;
  category?: string;
  limit?: number;
};

export type LectureProps = {
  create_id?: number;
  region?: string;
  image_url?: string;
  title?: string;
  creator?: string;
  content?: string;
  status?: string;
  price?: number;
  category?: string;
  current_participants?: number;
  learning_target?: string;
};

export type LectureObject = {
  [key: string]: string | number | undefined;
};
export type recommendProps = {
  recommendType: {
    name?: string;
    title?: string;
    subTitle?: string;
    endPoint?: string;
    params?: LectureParamProps;
  };
};

export type WeekPlan = {
  plan_id: number;
  week_id: number;
  week_title: string;
  create_id: number;
  detail_number: number;
  detail: string;
  createdDate: string;
};

export type WeekDto = {
  week_id: number;
  create_id: number;
  lectureTitle: string;
  week_number: number;
  week_title: string;
  createdDate: string;
};

export type LectureDto = {
  create_id: number;
  uid: number;
  userName: string;
  creator: string;
  category: string;
  image_url: string;
  title: string;
  content: string;
  learning_target: string;
  week: number;
  recruitEnd_date: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  region: string;
  price: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: string;
  createdDate: string;
  daysUntilRecruitEndMessage: string;
};

export type LectureDetailProps = {
  lectureDto: LectureDto;
  weekDto: WeekDto[];
  weekPlanDto: WeekPlan[];
};

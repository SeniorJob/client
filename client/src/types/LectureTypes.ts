export type LectureDataProps = {
  data: LectureProps;
};

export type LectureProps = {
  create_id?: number;
  image_url?: string;
  title?: string;
  creator?: string;
  status?: string;
  price?: number;
  category?: string;
};

export type LectureObject = {
  [key: string]: string | number | undefined;
};
export type recommendProps = {
  recommendType: {
    name?: string;
    title: string;
    subTitle?: string;
    params: string;
  };
};

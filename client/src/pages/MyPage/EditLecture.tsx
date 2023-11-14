import { useEffect, useState } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import { useParams } from 'react-router-dom';
import { getDetailOfOpeningLectures } from '../../api/mypage';
import EditFirstStep from '../../components/MyPage/Edit/EditFirstStep';
import { FirstStep_T, LectureDetails } from '../../types/LectureTypes';

const EditLecture = () => {
  const id = useParams().lecture_id;
  const [info, setInfo] = useState<LectureDetails>();
  const [firstInfo, setFirstInfo] = useState<FirstStep_T>();
  // const [secondInfo, setSecondInfo] = useState<WeekDto>();

  useEffect(() => {
    const handleGetDetailOfApplyLectures = async () => {
      if (id) {
        const res = await getDetailOfOpeningLectures(parseInt(id));
        const firstData = res.data.lectureDto;
        const {
          title,
          content,
          learning_target,
          week,
          recruitEnd_date,
          start_date,
          end_date,
          max_participants,
          region,
          price,
          bank_name,
          account_name,
          account_number,
          createdDate,
          category,
        } = firstData;
        setInfo(res.data);

        setFirstInfo({
          title,
          content,
          learning_target,
          week,
          recruitEnd_date,
          start_date,
          end_date,
          max_participants,
          region,
          price,
          bank_name,
          account_name,
          account_number,
          createdDate,
          category,
        });
        console.log(firstData);
      }
    };
    handleGetDetailOfApplyLectures();
  }, []);

  return (
    <MyPageLayout>
      {/* <MyPageTitle title="수정" /> */}
      {firstInfo && id && info && (
        <EditFirstStep
          id={parseInt(id)}
          imgUrl={info.lectureDto.image_url}
          firstInfo={firstInfo}
          setFirstInfo={setFirstInfo}
        />
      )}
    </MyPageLayout>
  );
};

export default EditLecture;

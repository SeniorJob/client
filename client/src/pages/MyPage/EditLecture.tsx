import { useEffect, useState } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import { useParams, Link } from 'react-router-dom';
import { getDetailOfOpeningLectures } from '../../api/mypage';
import EditFirstStep from '../../components/MyPage/Edit/EditFirstStep';
import { FirstStep_T, LectureDetails } from '../../types/LectureTypes';
import EditSecondStep from '../../components/MyPage/Edit/EditSecondStep';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EditLecture = () => {
  const navigate = useNavigate();
  const currentPage = useParams().page;
  const id = useParams().lecture_id;
  const [info, setInfo] = useState<LectureDetails>();

  const [firstInfo, setFirstInfo] = useState<FirstStep_T>();
  const [weekDto, setWeekDto] = useState();
  const [weekPlanDto, setWeekPlanDto] = useState();

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

        setInfo({ ...res.data });
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
        setWeekDto(res.data.weekDto);
        setWeekPlanDto(res.data.weekPlanDto);
      }
    };

    handleGetDetailOfApplyLectures();
  }, []);

  const EditMoveUrl = `/mypage/lecture/edit/${
    currentPage === '1' ? '2' : '1'
  }/${info?.lectureDto.create_id}`;

  return (
    <MyPageLayout>
      {currentPage === '1' && firstInfo && id && info && (
        <EditFirstStep
          id={parseInt(id)}
          firstInfo={firstInfo}
          setFirstInfo={setFirstInfo}
        />
      )}

      {currentPage === '2' && weekDto && weekPlanDto && (
        <EditSecondStep weekDto={weekDto} weekPlanDto={weekPlanDto} />
      )}
      {info && (
        <>
          <EditStateButton to={EditMoveUrl} replace={true}>
            {currentPage === '1' ? '2' : '1'}단계로 이동
          </EditStateButton>
          <CalcelButton type="button" onClick={() => navigate(-1)}>
            수정취소
          </CalcelButton>
        </>
      )}
    </MyPageLayout>
  );
};

export default EditLecture;

const EditStateButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 470px;
  height: 48px;
  margin: 0 auto 0 auto;
  &:hover {
    border-color: green;
  }
`;

const CalcelButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 470px;
  height: 48px;
  margin: 20px auto;
  &:hover {
    border-color: green;
  }
`;

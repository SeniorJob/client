import { WeekDto, WeekPlan } from '../../../types/LectureTypes';
import styled from 'styled-components';
import SecondStepTitle from './SecondStepTitle';
import SecondStepList from './SecondStepList';
import SecondStepAddList from './SecondStepAddList';
import AddWeek from './AddWeek';

type EditSecondStep_T = {
  weekDto: WeekDto[];
  weekPlanDto: WeekPlan[];
};

const EditSecondStep = ({ weekDto, weekPlanDto }: EditSecondStep_T) => {
  return (
    <Container>
      {weekDto.map(info => {
        return (
          <Wrapper>
            <SecondStepTitle
              create_id={info.create_id}
              week_title={info.week_title}
              week_number={info.week_number}
              week_id={info.week_id}
            />

            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {weekPlanDto.map(
                planInfo =>
                  info.week_id === planInfo.week_id && (
                    <SecondStepList
                      create_id={planInfo.create_id}
                      week_id={planInfo.week_id}
                      plan_id={planInfo.plan_id}
                      detail={planInfo.detail}
                      detail_number={planInfo.detail_number}
                      week_number={info.week_number}
                    />
                  ),
              )}

              <SecondStepAddList
                create_id={info.create_id}
                week_id={info.week_id}
                week_number={info.week_number}
              />
            </ul>
          </Wrapper>
        );
      })}
      <AddWeek lectureId={weekDto[0].create_id} />
    </Container>
  );
};

export default EditSecondStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right: 100px;
  margin-left: 100px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  border: 1px solid lightgray;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

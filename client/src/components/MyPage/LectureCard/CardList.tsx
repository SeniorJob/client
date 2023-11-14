import styled from 'styled-components';
import { LectureDto, SuggestionLectureDto } from '../../../types/LectureTypes';
import Card from './Card';
import SuggestionCard from './SuggestionCard';

type CardList_T = {
  type: '개설' | '신청' | '제안';
  lectures?: LectureDto[];
  sugLectures?: SuggestionLectureDto[];
};

const CardList = ({ type, lectures, sugLectures }: CardList_T) => {
  return (
    <ListContainer>
      {type === '개설' &&
        lectures?.map(lecture => (
          <Card key={lecture.create_id} type={type} info={lecture} />
        ))}

      {type === '신청' &&
        lectures?.map(lecture => (
          <Card key={lecture.create_id} type={type} info={lecture} />
        ))}

      {type === '제안' &&
        sugLectures?.map(lecture => (
          <SuggestionCard key={lecture.proposalId} info={lecture} />
        ))}
    </ListContainer>
  );
};

export default CardList;

const ListContainer = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  height: 590px;
`;

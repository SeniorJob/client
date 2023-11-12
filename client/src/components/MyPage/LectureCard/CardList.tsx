import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import Card from './Card';

type CardList_T = {
  lectures: LectureDto[];
};

const CardList = ({ lectures }: CardList_T) => {
  return (
    <ListContainer>
      {lectures.map((lecture: LectureDto) => (
        <Card key={lecture.create_id} info={lecture} />
      ))}
    </ListContainer>
  );
};

export default CardList;

const ListContainer = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

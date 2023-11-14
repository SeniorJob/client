import styled from 'styled-components';
import { SuggestionLectureDto } from '../../../types/LectureTypes';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import EditSuggestionModal from '../Edit/EditSuggestionModal';

interface Card_T {
  info: SuggestionLectureDto;
}

const Card = ({ info }: Card_T) => {
  const { content, proposalId, region, title } = info;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container>
        <LinkWrapper to={`/lectures/detail/${proposalId}`}>
          <CardInfoWrapper>
            <Title>{title}</Title>
            <Region>{region}</Region>
            <Content>{content}</Content>
          </CardInfoWrapper>
        </LinkWrapper>

        <DeleteButton onClick={() => setShowModal(true)}>수정하기</DeleteButton>
      </Container>

      {showModal &&
        createPortal(
          <EditSuggestionModal
            proposalId={proposalId}
            setShowModal={setShowModal}
          />,
          document.body,
        )}
    </>
  );
};

export default Card;

const Container = styled.li`
  position: relative;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const LinkWrapper = styled(Link)`
  display: flex;
  height: 180px;
  padding: 10px;
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  width: 340px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Region = styled.div`
  font-size: 14px;
  color: gray;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  line-height: 140%;
  margin-top: 8px;
  width: 420px;
`;

const DeleteButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid lightgray;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 10px;
`;

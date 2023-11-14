import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import EditApplicationModal from '../Edit/EditApplicationModal';
import EditOpeningModal from '../Edit/EditOpeningModal';

interface Card_T {
  type: '개설' | '신청' | '제안';
  info: LectureDto;
}

const Card = ({ type, info }: Card_T) => {
  const {
    le_id,
    create_id,
    image_url,
    title,
    region,
    content,
    status,
    current_participants,
    max_participants,
  } = info;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container>
        <LinkWrapper to={`/lectures/detail/${create_id}`}>
          <Image src={image_url} alt="이미지" />
          <CardInfoWrapper>
            <Title>{title}</Title>
            <Region>{region}</Region>
            <Content>{content}</Content>
            <BottomInfoWrapper>
              <div>{status}</div>
              <div>
                {current_participants} /&nbsp;
                {max_participants}명
              </div>
            </BottomInfoWrapper>
          </CardInfoWrapper>
        </LinkWrapper>

        {(status === '신청가능상태' || status === '개설대기상태') && (
          <DeleteButton onClick={() => setShowModal(true)}>
            수정하기
          </DeleteButton>
        )}
      </Container>

      {showModal &&
        (type === '개설'
          ? createPortal(
              <EditOpeningModal
                title={title}
                create_id={create_id}
                setShowModal={setShowModal}
              />,
              document.body,
            )
          : type === '신청' &&
            createPortal(
              <EditApplicationModal
                title={title}
                createId={create_id}
                leId={le_id}
                setShowModal={setShowModal}
              />,
              document.body,
            ))}
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

const Image = styled.img`
  width: 180px;
  border-radius: 10px;
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Region = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: -4px;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 140%;
  margin-top: 6px;
  width: 240px;
`;

const BottomInfoWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
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

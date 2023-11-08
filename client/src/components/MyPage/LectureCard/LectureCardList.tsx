import styled from 'styled-components';
import LectureCard from './LectureCard';

interface LectureCardList_I {
  type?: '제안';
}

const LectureCardList = ({ type }: LectureCardList_I) => {
  console.log(type);
  return (
    <LectureListContainer type={type}>
      <LectureCard type="제안" id={1} />
      <LectureCard />
      <LectureCard />
      <LectureCard />
      <LectureCard />
      <LectureCard />
      <LectureCard />
      <LectureCard />
    </LectureListContainer>
  );
};

export default LectureCardList;

const LectureListContainer = styled.ul<{ type?: '제안' }>`
  margin-top: 20px;
  display: ${props => (props.type !== '제안' ? 'flex' : 'grid')};
  flex-direction: ${props => props.type !== '제안' && 'column'};
  grid-template-columns: ${props => props.type === '제안' && '1fr 1fr'};
  gap: 20px;
`;

{
  /* {
    "content": [
        {
            "create_id": 35,
            "le_id": 32,
            "uid": 32,
            "creator": "안준식",
            "category": "IT",
            "title": "정보처리기사 필기 속성강의",
            "recruitEnd_date": "2023-11-07T00:00:00",
            "start_date": "2023-11-08T09:00:00",
            "end_date": "2023-12-08T09:00:00",
            "max_participants": 15,
            "current_participants": 3,
            "region": "서울시 종로구 IT 아카데미",
            "price": 49000,
            "status": "신청가능상태",
            "createdDate": "2023-10-30T12:14:44",
            "daysUntilRecruitEndMessage": "모집 마감까지 6일 남았습니다!"
        },
    ],
    "pageable": {
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "offset": 0,
        "pageSize": 12,
        "pageNumber": 0,
        "paged": true,
        "unpaged": false
    },
    "last": true,
    "totalElements": 3,
    "totalPages": 1,
    "size": 12,
    "number": 0,
    "numberOfElements": 3,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "first": true,
    "empty": false
} */
}

import LectureCardList from '../../components/MyPage/LectureCard/LectureCardList';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import MyPageTitle from '../../components/MyPage/MyPageTitle';

const Suggestion = () => {
  return (
    <MyPageLayout>
      <MyPageTitle />

      <LectureCardList type="제안" />
      {/* {
    "content": [
        {
            "proposalId": 10,
            "category": "운전",
            "title": "자가용운전연습",
            "content": "저는 해외여행시 더 재미있는 경험을 위해 운전연습을 하고 싶습니다.",
            "region": "경기도 고양시 일산동구 923-4",
            "createdDate": "2023-10-30T19:15:31"
        },
        {
            "proposalId": 9,
            "category": "교육",
            "title": "영어공부",
            "content": "저는 해외여행시 더 재미있는 경험을 위해 영어를 공부하고 싶습니다.",
            "region": "경기도 고양시 일산동구 923-4",
            "createdDate": "2023-10-30T17:58:22"
        }
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
        "unpaged": false,
        "paged": true
    },
    "last": true,
    "totalElements": 2,
    "totalPages": 1,
    "size": 12,
    "number": 0,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "numberOfElements": 2,
    "first": true,
    "empty": false
} */}
    </MyPageLayout>
  );
};

export default Suggestion;

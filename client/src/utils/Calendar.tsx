import styled from 'styled-components';

interface CalendarProps {
  recruitEndDate: string;
  startDate: string;
  endDate: string;
  setRecruitEndDate: (date: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const SelectDate = styled.input`
  width: 150px;
`;

const SubTitleLabel = styled.label`
  font-weight: bold;
`;

const Calendar: React.FC<CalendarProps> = ({
  recruitEndDate,
  startDate,
  endDate,
  setRecruitEndDate,
  setStartDate,
  setEndDate,
}) => {
  // 모집 날짜 선택을 처리하는 함수
  const handleRecruitmentDate = (selectedDate: string) => {
    setRecruitEndDate(selectedDate);
  };

  // 강좌 시작 날짜 선택을 처리하는 함수
  const handleCourseStartDate = (selectedDate: string) => {
    setStartDate(selectedDate);
  };

  // 강좌 종료 날짜 선택을 처리하는 함수
  const handleCourseEndDate = (selectedDate: string) => {
    setEndDate(selectedDate);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <div>
          <SubTitleLabel>모집 마감 날짜: </SubTitleLabel>
          <SelectDate
            className="w-44"
            type="date"
            value={recruitEndDate || ''}
            onChange={e => handleRecruitmentDate(e.target.value)}
          />
        </div>
        <div className="text-stone-500">
          모집마감날짜는 강좌에 신청인원을 모집하는 날짜입니다.
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <SubTitleLabel>강좌 시작 날짜: </SubTitleLabel>
          <SelectDate
            className="w-44"
            type="date"
            value={startDate || ''}
            onChange={e => handleCourseStartDate(e.target.value)}
          />
        </div>
        <div className="text-stone-500">
          모집마감 후 강좌가 시작되는 날짜입니다.
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <SubTitleLabel>강좌 종료 날짜: </SubTitleLabel>
          <SelectDate
            className="w-44"
            type="date"
            value={endDate || ''}
            onChange={e => handleCourseEndDate(e.target.value)}
          />
        </div>
        <div className="text-stone-500">강좌가 종료되는 날짜입니다.</div>
      </div>
    </div>
  );
};

export default Calendar;

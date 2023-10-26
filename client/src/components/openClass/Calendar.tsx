import { useState } from 'react';

const Calendar: React.FC = () => {
  // 선택된 날짜를 관리하는 상태
  const [recruitmentDate, setRecruitmentDate] = useState<string | null>(null);
  const [courseStartDate, setCourseStartDate] = useState<string | null>(null);
  const [courseEndDate, setCourseEndDate] = useState<string | null>(null);

  // 모집 날짜 선택을 처리하는 함수
  const handleRecruitmentDate = (selectedDate: string) => {
    setRecruitmentDate(selectedDate);
  };

  // 강좌 시작 날짜 선택을 처리하는 함수
  const handleCourseStartDate = (selectedDate: string) => {
    setCourseStartDate(selectedDate);
  };

  // 강좌 종료 날짜 선택을 처리하는 함수
  const handleCourseEndDate = (selectedDate: string) => {
    setCourseEndDate(selectedDate);
  };

  return (
    <div className="ml-4">
      <label>모집 마감 날짜: </label>
      <input
        className="w-44"
        type="date"
        value={recruitmentDate || ''}
        onChange={e => handleRecruitmentDate(e.target.value)}
      />
      <br />
      <label>강좌 시작 날짜: </label>
      <input
        className="w-44"
        type="date"
        value={courseStartDate || ''}
        onChange={e => handleCourseStartDate(e.target.value)}
      />
      <br />
      <label>강좌 종료 날짜: </label>
      <input
        className="w-44"
        type="date"
        value={courseEndDate || ''}
        onChange={e => handleCourseEndDate(e.target.value)}
      />
    </div>
  );
};

export default Calendar;

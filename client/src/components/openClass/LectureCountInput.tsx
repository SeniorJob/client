import { useState } from 'react';

const LectureCountInput: React.FC = () => {
  // 선택된 강의 회차를 관리하는 상태
  const [lectureCount, setLectureCount] = useState<number | null>(null);

  // 강의 회차 입력을 처리하는 함수
  const handleLectureCount = (count: string) => {
    const parsedCount = parseInt(count);
    setLectureCount(parsedCount);
  };

  return (
    <div className="flex gap-4">
      <label>강의 회차: </label>
      <input
        type="number"
        value={lectureCount || 0}
        onChange={e => handleLectureCount(e.target.value)}
        min={0}
        max={7}
      />
      <div className="text-stone-500">
        일주일에 실시되는 강좌의 횟수를 알려주세요!
      </div>
    </div>
  );
};

export default LectureCountInput;

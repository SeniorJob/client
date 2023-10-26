import { useState } from 'react';

interface CountInputProps {
  labelTitle: React.ReactNode;
  labelText: React.ReactNode;
}

const CountInput: React.FC<CountInputProps> = ({ labelTitle, labelText }) => {
  // 선택된 강의 회차를 관리하는 상태
  const [count, setCount] = useState<number | null>(null);

  // 숫자를 카운트하는 함수
  const handleCount = (count: string) => {
    const parsedCount = parseInt(count);
    setCount(parsedCount);
  };

  return (
    <div className="flex gap-4 mt-2">
      <label>{labelTitle}</label>
      <input
        type="number"
        value={count || 0}
        onChange={e => handleCount(e.target.value)}
        min={0}
        max={7}
      />
      <div className="text-stone-500">{labelText}</div>
    </div>
  );
};

export default CountInput;

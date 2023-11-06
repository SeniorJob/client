import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface CountInputProps {
  labelTitle?: React.ReactNode;
  labelText: React.ReactNode;
  setCount: Dispatch<SetStateAction<number>>;
}

const SelectCount = styled.input`
  border: 1px solid black;
`;

const SubTitleLabel = styled.label`
  font-weight: bold;
`;

const CountInput: React.FC<CountInputProps> = ({
  labelTitle,
  labelText,
  setCount,
}) => {
  // 선택된 강의 회차를 관리하는 상태
  const [count, setLocalCount] = useState<number | null>(0);

  // 숫자를 카운트하는 함수
  const handleCount = (count: string) => {
    const parsedCount = parseInt(count);
    setLocalCount(parsedCount);
    setCount(parsedCount);
  };

  return (
    <div className="flex gap-4 mt-2">
      <SubTitleLabel>{labelTitle}</SubTitleLabel>
      <SelectCount
        type="number"
        value={count || ''}
        onChange={e => handleCount(e.target.value)}
        min={1}
        max={7}
        placeholder="3"
      />
      <div className="text-stone-500">{labelText}</div>
    </div>
  );
};

export default CountInput;

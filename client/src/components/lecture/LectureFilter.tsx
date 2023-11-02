import styled from 'styled-components';

const Filter = styled.div`
  width: 200px;
  border: 1px solid #ccc;
`;

export const LectureFilter = () => {
  return (
    <aside>
      <Filter>필터</Filter>
    </aside>
  );
};

import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

const FilterBar = () => {
  function getSiblings(currentNode: ReactNode | any) {
    const slblings = [];
    // 부모 노드가 없는 경우 현재 노드를 반환
    if (currentNode) {
      if (!currentNode.parentNode) return currentNode;
      // 1. 부모 노드를 접근합니다.
      const parentNode = currentNode.parentNode;
      // 2. 부모 노드의 첫 번째 자식 노드를 가져옵니다.
      let silblingNode = parentNode.firstChild;
      while (silblingNode) {
        // 기존 노드가 아닌 경우 배열에 추가합니다.
        if (silblingNode.nodeType === 1 && silblingNode !== currentNode) {
          slblings.push(silblingNode);
        }
        // 다음 노드를 접근합니다.
        silblingNode = silblingNode.nextElementSibling;
      }
      // 형제 노드가 담긴 배열을 반환합니다.
      return slblings;
    }
  }

  const onClickStatus = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const siblings = getSiblings(target);

    target.classList.toggle('active');
    siblings.forEach((ele: HTMLLIElement) => ele.classList.remove('active'));
  };

  const onClickFilter = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const siblings = getSiblings(target);

    target.classList.add('active');
    siblings.forEach((ele: HTMLLIElement) => ele.classList.remove('active'));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <StatusListContainer>
        <StatusList onClick={onClickStatus}>모집중</StatusList>
        <StatusList onClick={onClickStatus}>개설대기중</StatusList>
        <StatusList onClick={onClickStatus}>진행중</StatusList>
        <StatusList onClick={onClickStatus}>완료강좌</StatusList>
      </StatusListContainer>

      <FilterListContainer>
        <FilterList className="active" onClick={onClickFilter}>
          최신순
        </FilterList>
        <FilterList onClick={onClickFilter}>오래된순</FilterList>
        <FilterList onClick={onClickFilter}>인기순</FilterList>
        <FilterList onClick={onClickFilter}>가격높은순</FilterList>
        <FilterList onClick={onClickFilter}>가격낮은순</FilterList>
      </FilterListContainer>
    </div>
  );
};

export default FilterBar;

const StatusListContainer = styled.ul`
  display: flex;
  margin-top: 20px;
  gap: 16px;
`;

const StatusList = styled.li`
  border: 1px solid lightgray;
  text-align: center;
  padding: 6px 14px;
  border-radius: 20px;

  &.active {
    background-color: #70e270;
    font-weight: bold;
  }
`;

const FilterListContainer = styled.ul`
  display: flex;
  gap: 10px;
`;

const FilterList = styled.li`
  color: gray;

  &.active {
    color: #329c32;
    font-weight: bold;
  }
`;

import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

type FilterBar_T = {
  type: '개설' | '신청' | '제안';
};

const FilterBar = ({ type }: FilterBar_T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('');
  const [descending, setDescending] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    searchParams.get('filter') &&
      setFilter(searchParams.get('filter') as string);
    setDescending(searchParams.get('descending') as string);
    setStatus(searchParams.get('status') as string);
  }, []);

  function getSiblings(currentNode: ReactNode | any) {
    const slblings = [];
    if (currentNode) {
      // 부모 노드가 없는 경우 현재 노드를 반환
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

  const onClickStatusFilter = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const status = target.innerHTML;

    target.classList.contains('active')
      ? searchParams.delete('status')
      : searchParams.set('status', status);

    target.classList.toggle('active');
    const siblings = getSiblings(target);

    siblings.forEach((ele: HTMLLIElement) => ele.classList.remove('active'));

    setSearchParams(searchParams);
  };

  const onClickTimeFilter = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const filter = target.innerHTML;

    if (filter === '최신순') {
      searchParams.delete('filter');
      searchParams.delete('descending');
    } else if (filter === '오래된순') {
      searchParams.set('filter', 'latest');
      searchParams.set('descending', 'false');
    } else if (filter === '인기순') {
      searchParams.set('filter', 'popularity');
    } else if (filter === '가격높은순') {
      searchParams.delete('descending');
      searchParams.set('filter', 'price');
    } else if (filter === '가격낮은순') {
      searchParams.set('filter', 'price');
      searchParams.set('descending', 'false');
    }

    target.classList.add('active');

    const siblings = getSiblings(target);
    siblings.forEach((ele: HTMLLIElement) => ele.classList.remove('active'));

    setSearchParams(searchParams);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <FilterListContainer>
        {type !== '제안' && (
          <>
            <FilterList
              className={status === '모집중' ? 'active' : ''}
              onClick={onClickStatusFilter}
            >
              모집중
            </FilterList>
            <FilterList
              className={status === '개설대기중' ? 'active' : ''}
              onClick={onClickStatusFilter}
            >
              개설대기중
            </FilterList>
            <FilterList
              className={status === '진행중' ? 'active' : ''}
              onClick={onClickStatusFilter}
            >
              진행중
            </FilterList>
            <FilterList
              className={status === '완료강좌' ? 'active' : ''}
              onClick={onClickStatusFilter}
            >
              완료강좌
            </FilterList>
          </>
        )}
      </FilterListContainer>

      <FilterListContainer>
        <FilterList
          className={filter === '' ? 'active' : ''}
          onClick={onClickTimeFilter}
        >
          최신순
        </FilterList>
        <FilterList
          className={filter === 'latest' ? 'active' : ''}
          onClick={onClickTimeFilter}
        >
          오래된순
        </FilterList>
        {type !== '제안' && (
          <>
            <FilterList
              className={filter === 'popularity' ? 'active' : ''}
              onClick={onClickTimeFilter}
            >
              인기순
            </FilterList>
            <FilterList
              className={filter === 'price' ? 'active' : ''}
              onClick={onClickTimeFilter}
            >
              가격높은순
            </FilterList>
            <FilterList
              className={
                filter === 'price' && descending === 'false' ? 'active' : ''
              }
              onClick={onClickTimeFilter}
            >
              가격낮은순
            </FilterList>
          </>
        )}
      </FilterListContainer>
    </div>
  );
};

export default FilterBar;

const FilterListContainer = styled.ul`
  display: flex;
  margin-top: 20px;
  gap: 6px;
`;
const FilterList = styled.li`
  border: 1px solid lightgray;
  color: gray;
  text-align: center;
  padding: 6px 14px;
  border-radius: 20px;
  &.active {
    border-color: #329c32;
    color: #329c32;
    font-weight: bold;
  }
`;

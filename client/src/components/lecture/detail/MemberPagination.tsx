import React from 'react';
import styled from 'styled-components';

type MemberPaginationProps = {
  totalPages: number | null | undefined;
  setPage: (num: number) => void;
  page: number | string;
};

export const MemberPagination: React.FC<MemberPaginationProps> = ({
  totalPages,
  setPage,
  page,
}) => {
  const pageNumber = new Array(totalPages).fill(0);

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageClick(Number(page) - 1)}
        disabled={page === 1}
      >
        이전 페이지
      </PageButton>
      <div className="pagination flex gap-2 justify-center">
        {pageNumber.map((_, idx) => (
          <PageButton
            key={idx + 1}
            onClick={() => handlePageClick(idx + 1)}
            className={idx + 1 === Number(page) ? 'current' : ''}
          >
            {idx + 1}
          </PageButton>
        ))}
      </div>
      <PageButton
        onClick={() => handlePageClick(Number(page) + 1)}
        disabled={page === totalPages}
      >
        다음 페이지
      </PageButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.7rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  &:hover {
    background-color: #f0f0f0;
  }
  &.current {
    border-color: var(--primaryColor);
    background-color: var(--primaryColor);
    color: #fff;
  }
  &:disabled {
    visibility: hidden;
  }
`;

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.7rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  &.current {
    border-color: var(--primaryColor);
    background-color: var(--primaryColor);
    color: #fff;
  }
  &:disabled {
    visibility: hidden;
  }
`;

export const LectureFooter = ({
  totalPages,
  setPage,
  page,
}: {
  totalPages: number | null | undefined;
  setPage: (num: number) => void;
  page: number | string;
}) => {
  const navigate = useNavigate();
  const searchParam = new URLSearchParams(location.search);
  const pageNumber = new Array(totalPages).fill(0);
  const paginate = (num: number) => {
    searchParam.set('page', `${num}`);
    setPage(num);
    navigate(
      {
        pathname: '/lectures/filter',
        search: searchParam.toString(),
      },
      { replace: true },
    );
  };

  return (
    <div className="flex justify-between items-center my-3">
      <PageButton
        onClick={() => paginate(Number(page) - 1)}
        disabled={page === 1}
      >
        이전 페이지
      </PageButton>
      <div className="pagination flex gap-2 justify-center">
        {pageNumber.map((num, idx) => (
          <PageButton
            key={idx + 1}
            onClick={() => paginate(idx + 1)}
            className={
              idx + 1 === page
                ? 'current' // 현재 페이지의 버튼 스타일
                : '' // 다른 페이지 버튼 스타일
            }
          >
            {idx + 1}
          </PageButton>
        ))}
      </div>
      <PageButton
        onClick={() => paginate(Number(page) + 1)}
        disabled={page === totalPages}
      >
        다음 페이지
      </PageButton>
    </div>
  );
};

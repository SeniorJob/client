import { useState, useEffect } from 'react';
import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { getAppliedMembers, modifyApplyStatus } from '../../../api/lecture';
import { MemberPagination } from './MemberPagination';
import { LoadingSpinner } from '../LoadingSpinner';
import CautionSVG from '../../../assets/images/caution.svg?react';

type ManageMember_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

type AppliedMember_T = {
  uid: number;
  userName: string;
  applyReason: string;
  lectureApplyStatus: string;
};

export const ManageMember: React.FC<ManageMember_T> = ({
  lectureId,
  closeModal,
}) => {
  const [data, setData] = useState<AppliedMember_T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMember = async () => {
    setIsLoading(true);
    try {
      const params: { lectureId?: number; page?: number; size?: number } = {};
      if (lectureId) params.lectureId = lectureId;
      if (page) params.page = page;
      const response = await getAppliedMembers(params);

      if (response?.status === 200) {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        if (!response) {
          setData([]);
          // setTotalPages(null);
        } else {
          setData(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      }
    } catch (err) {
      console.log('멤버 불러오기 오류');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [lectureId, page]);

  const handleToggleStatus = async (
    uid: number,
    lectureId: number,
    currentStatus: string,
  ) => {
    try {
      const params: { userId?: number; lectureId?: number; status?: string } =
        {};
      if (lectureId) params.lectureId = lectureId;
      if (uid) params.userId = uid;
      if (currentStatus) {
        const newStatus = currentStatus === '대기' ? '승인' : '대기';
        params.status = newStatus;
      }

      const response = await modifyApplyStatus(params);

      if (response?.status === 200) {
        fetchMember();
      } else {
        console.log('상태 변경 실패');
      }
    } catch (error) {
      console.error('상태 토글 오류', error);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <MemberManageContainer>
        <h2>강좌 신청 인원 관리</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>이름</TableHeader>
                  <TableHeader>신청 이유</TableHeader>
                  <TableHeader>신청 상태</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {data &&
                  data.length !== 0 &&
                  data.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.userName}</TableCell>
                      <TableCell className="min-w-[200px]">
                        {data.applyReason}
                      </TableCell>
                      <TableCell>
                        <ToggleStatusButton
                          status={data.lectureApplyStatus}
                          onClick={() =>
                            handleToggleStatus(
                              data.uid,
                              lectureId!,
                              data.lectureApplyStatus,
                            )
                          }
                        >
                          {data.lectureApplyStatus}상태
                        </ToggleStatusButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
            {data.length === 0 && (
              <div className="w-[300px] h-[320px] flex flex-col justify-center items-center">
                <CautionSVG width={60} />
                지금은 신청자가 없습니다.
              </div>
            )}
          </>
        )}
      </MemberManageContainer>
      {totalPages !== 0 && (
        <MemberPagination
          totalPages={totalPages}
          setPage={setPage}
          page={page}
        />
      )}
    </Modal>
  );
};

const MemberManageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  align-items: center;
  margin: 1rem 0 0.6rem 0;
  gap: 1rem;
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const Table = styled.table`
  border: 1px solid #ddd;
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 0.7rem;
  text-align: center;
  background-color: #f2f2f2;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 0.4rem 0.8rem;
  text-align: center;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

interface ToggleStatusButton_P {
  status: string;
}

const ToggleStatusButton = styled.button<ToggleStatusButton_P>`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  color: #fff;
  background-color: ${({ status }) =>
    status === '승인' ? 'var(--primaryColor)' : '#abc3eb'};
  &:hover {
    opacity: 0.9;
  }
`;

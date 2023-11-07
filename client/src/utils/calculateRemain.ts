export function calculateRemain(recruitEndDate?: string) {
  // 현재 날짜와 시간 가져오기
  const currentDateTime = new Date();

  try {
    // 문자열로부터 날짜 시간 객체 생성
    if (recruitEndDate) {
      const recruitEndDateTime = new Date(recruitEndDate);

      // 남은 시간 계산
      const timeDifference =
        recruitEndDateTime.getTime() - currentDateTime.getTime();

      // 남은 일, 시간, 분, 초 계산
      const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor(
        (timeDifference / (1000 * 60 * 60)) % 24,
      );
      //   const remainingMinutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      //   const remainingSeconds = Math.floor((timeDifference / 1000) % 60);

      if (remainingDays === 0) {
        return `${remainingHours}시간`;
      } else {
        return `${remainingDays}일`;
      }
    }
  } catch (error) {
    return '날짜 형식이 잘못되었습니다.';
  }
}

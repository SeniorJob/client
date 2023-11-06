export function splitRegion(region?: string) {
  const parts = region?.split(' '); // 띄어쓰기를 기준으로 문자열을 분리
  const shortRegion = parts?.slice(0, 2).join(' '); // 처음 2개 요소를 가져와서 다시 합치기
  // 주소가 없는 온라인인 경우
  if (region?.includes('온라인')) {
    return '온라인 (원격 수업)';
  } else {
    return shortRegion;
  }
}

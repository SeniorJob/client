//로그인 폼 유효성 검사
export const Id = (str: string) => {
  return str.length >= 8;
};

// 회원가입 폼 유효성 검사
export const PwValid = (str: string) => {
  // 최소 8자 이상이면서 문자와 숫자가 모두 포함되어야 함
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return regex.test(str);
};

export const PwcfValid = (pw: string, str: string): boolean => {
  return pw === str;
};

export function isLoginValid(id: string, pw: string): string {
  if (id === null) {
    return 'ID를 입력하세요.';
  } else if (pw === null) {
    return '비밀번호를 입력하세요.';
  } else {
    return '유효성 검사 통과';
  }
}

export function isSignupValid(id: string, pw: string, phone: string): boolean {
  // ID에 '-'가 없어야 함
  if (id.includes('-')) {
    return false;
  }

  // PW는 8자 이상이어야 함, 숫자와 문자를 포함해야 함
  if (pw.length < 8 || !/\d/.test(pw) || !/[a-zA-Z]/.test(pw)) {
    return false;
  }

  return id && pw && phone;
}

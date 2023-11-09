import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface SignPostCodeProps {
  setForm: React.Dispatch<React.SetStateAction<any>>; // 객체를 받아들일 수 있는 형식으로 변경
}

const SignPostCode: React.FC<SignPostCodeProps> = ({ setForm }) => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // 빌드 오류로 인해 임시 수정하였습니다
    // 수정 전 코드
    // setForm(prevForm => ({
    //   ...prevForm,
    //   address: fullAddress,
    // }));
    setForm((prevForm: any) => ({
      ...prevForm,
      address: fullAddress,
    }));
  };

  const handleClick = () => {
    open({
      onComplete: handleComplete,
    });
  };

  return (
    <div className="flex space-x-[176px] ">
      <span className="pt-3">주소</span>
      <button
        className="border rounded p-1"
        type="button"
        onClick={handleClick}
      >
        우편번호 찾기
      </button>
    </div>
  );
};

export default SignPostCode;

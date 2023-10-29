import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import tw from 'tailwind-styled-components';
import styled from 'styled-components';

interface SignPostCodeProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const SignPostCode: React.FC<SignPostCodeProps> = ({ setAddress }) => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = data => {
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
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({
      onComplete: handleComplete,
    });
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        우편번호 찾기
      </button>
    </div>
  );
};

export default SignPostCode;

import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const SignPostCode = ({ address }) => {
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
    address(fullAddress);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <DaumPostcodeEmbed
      className="fixed right-1 top-20 w-[100px] h-[100px]"
      autoClose
      onComplete={handleComplete}
    />
  );
};

export default SignPostCode;

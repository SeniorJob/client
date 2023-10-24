import tw from 'twin.macro';
import styled from '@emotion/styled';
import IdIcon from "../../assets/images/IdIcon.svg";
import PwIcon from "../../assets/images/PwIcon.svg";
const LoginDown= () => {

    return (
        <LoginDownDivBox>
            <LoginLeftDivBox>
                <LoginLeftText> <strong>SiniorJob</strong>에 오신<br/>여러분 진심으로 환영합니다.</LoginLeftText>
            </LoginLeftDivBox>
            <LoginRightDivBox>
                <LoginInPutForm>
                    <InputWrapper>
                        <img src={IdIcon} alt='아이디 아이콘'></img>
                        <Input type="text"  placeholder="아이디를 입력해주세요"/>
                    </InputWrapper>
                    <InputWrapper>
                        <img src={PwIcon} alt='아이디 아이콘'></img>
                        <Input type="password" placeholder="비밀번호를 입력해주세요"/>
                    </InputWrapper>
                </LoginInPutForm>
                <LoginMainBtn>로그인</LoginMainBtn>
                <LoginDivBox>
                        <LoginDivBox>
                            <AccountHelpBox>
                                <LoginBtnBox>아이디 찾기 |</LoginBtnBox>
                                <LoginBtnBox>비밀번호 찾기 |</LoginBtnBox>
                                <SignBtnBox>회원가입</SignBtnBox>
                            </AccountHelpBox>
                        </LoginDivBox>
                </LoginDivBox>
            </LoginRightDivBox>
        </LoginDownDivBox>
    );
};

export default LoginDown;

const LoginDivBox= styled.div`
`;

const LoginDownDivBox= styled.div`
    display:flex;
    align-items: center;
    justify-content: space-around;
`;
const LoginLeftDivBox= styled.div`
    width: 300px;
    height: 200px;
    margin: 0px 0px 0px 0px;

strong{
    color: #00eeffd6;
    font-size: 40px;
}
`;
const LoginLeftText= styled.h2`
    font-size: 24px;
`;
const LoginRightDivBox= styled.div`
    width: 300px;
    padding: 0px 10px 10px 10px;
`;

const AccountHelpBox = styled.div`
    display:flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: 700;
`;

const LoginBtnBox = styled.button`
    margin-top : 10px;
`;

const SignBtnBox = styled.button`
    margin-top : 10px;
`;

const LoginMainBtn = styled.div`
    text-align : center;
    padding: 10px;
    height: 50px;
    line-height: 1.5;
    border : 1px solid #dcf8fad5;
    border-radius : 8px;
    background-color: #00eeffd6;
    
:hover{
    cursor: pointer;
}

:active{
    background-color: #1d9690;
}
`;

const LoginInPutForm = styled.div``;

const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    margin: 5px 0 10px 0;
    border: 1px solid black;
    border-radius: 8px;
img{
    width: 30px;
    margin-left: 5px;
};
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;

    &:focus {
        outline: none; // 포커스 시 테두리 없애기
    }
`;

import tw from 'twin.macro';
import styled from '@emotion/styled';

import LoginTop from "./loginTop";
import LoginDown from "./loginDown";

const Login = () => {
    return(
        <LoginLayout>
            <LoginContents>
                <LoginTop/>
                <LoginDown/>
            </LoginContents>
        </LoginLayout>
    );
};

export default Login;

//전역 스타일
const LoginLayout= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginContents= styled.div`
        width: 970px;
        height: 600px;
        border: 1px solid black;
        margin-top: 10%;
        padding: 5% 5% 5% 5%; 
`;
import React from 'react';
import Heading from '../atom/Heading';
import styled from '@emotion/styled';
import Input from '../atom/Input';
import StaticButton from '../atom/StaticButton';

const Container = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const InputContainer = styled.div`
  width: 200px;
  height: 40px;
  margin: 30px auto;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 30px auto;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin: 30px auto;
`;

export default function LoginTemplate({
  handleChangeId,
  handleChangePassword,
}) {
  return (
    <Container>
      <LoginContainer>
        <TextContainer>
          <Heading
            text={
              <>
                <strong>YUTI</strong>
              </>
            }
            textAlign="center"
            fontSize="40px"
          />
        </TextContainer>
        {/* <TextContainer>
          <Heading text="로그인" textAlign="center" fontSize="20px" />
        </TextContainer> */}
        <InputContainer>
          <Input text="아이디" onChange={handleChangeId}></Input>
        </InputContainer>
        <InputContainer>
          <Input text="비밀번호" onChange={handleChangePassword}></Input>
        </InputContainer>
        <ButtonContainer>
          <StaticButton text="로그인" width="200px" height="40px" />
        </ButtonContainer>
      </LoginContainer>
    </Container>
  );
}

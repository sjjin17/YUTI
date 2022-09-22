import React from 'react';
import Heading from '../atom/Heading';
import styled from '@emotion/styled';
import Input from '../atom/Input';
import StaticButton from '../atom/StaticButton';

const Container = styled.div`
  width: 400px;
  height: 500px;
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  position: relative;
  top: 10%;
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
  left: 5px;
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
        <TextContainer>
          <Heading text="로그인" textAlign="center" fontSize="20px" />
        </TextContainer>
        <InputContainer>
          <Input text="아이디" onChange={handleChangeId}></Input>
        </InputContainer>
        <InputContainer>
          <Input text="비밀번호" onChange={handleChangePassword}></Input>
        </InputContainer>
        <ButtonContainer>
          <StaticButton text="로그인" width="208px" height="46px" />
        </ButtonContainer>
      </LoginContainer>
    </Container>
  );
}

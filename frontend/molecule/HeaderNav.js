import styled from '@emotion/styled';
import React from 'react';
import Calendar from '../atom/Calendar';
import Heading from '../atom/Heading';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc((100vw - 1440px) / 2);
  padding-right: calc((100vw - 1440px) / 2);
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  background: white;
`;

const RightContainer = styled.div`
  display: flex;
  padding-right: 20px;
  & input {
    border-width: 0;
    text-align: center;
    width: 130px;
    font-size: 20px;
  }
`;

const LogoutTextContainer = styled.div`
  white-space: nowrap;
  padding-left: 10px;
  cursor: pointer;
`;

export default function HeaderNav({
  startDate,
  setStartDate,
  handleLogoutSubmit,
}) {
  return (
    <Container>
      <Heading text="관리자 대시보드" fontSize={30}></Heading>
      <RightContainer>
        <Calendar startDate={startDate} setStartDate={setStartDate} />
        <LogoutTextContainer onClick={handleLogoutSubmit}>
          LOGOUT
        </LogoutTextContainer>
      </RightContainer>
    </Container>
  );
}

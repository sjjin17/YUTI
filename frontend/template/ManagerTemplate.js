import React from 'react';
import styled from '@emotion/styled';
import HeaderNav from '../molecule/HeaderNav';
import Item from '../atom/Item';

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 70px auto;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
`;

const Articles = styled.div`
  background: white;
  border-right: solid rgb(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
`;

const Content = styled.div``;
export default function ManagerTemplate({
  data,
  handleChartType,
  chartType,
  startDate,
  setStartDate,
  handleLogoutSubmit,
}) {
  return (
    <Wrap>
      <HeaderNav
        startDate={startDate}
        setStartDate={setStartDate}
        handleLogoutSubmit={handleLogoutSubmit}
      ></HeaderNav>
      <Container>
        <Articles>
          {data.map((v, idx) => (
            <Item key={idx} text={v} handleChartType={handleChartType}></Item>
          ))}
        </Articles>
        <Content>{chartType.type}</Content>
      </Container>
    </Wrap>
  );
}

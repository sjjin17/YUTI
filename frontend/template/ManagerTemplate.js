import React from 'react';
import styled from '@emotion/styled';
import HeaderNav from '../molecule/HeaderNav';
import Item from '../atom/Item';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';

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

const ChartContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 600px;
`;

const charts = {
  line: Line,
  bar: Bar,
  pie: Pie,
  radar: Radar,
};
export default function ManagerTemplate({
  chartInfoList,
  handleChartType,
  chartType,
  startDate,
  setStartDate,
  handleLogoutSubmit,
  getChartData,
  chartOptions,
  chartData,
  setChartData,
}) {
  const Chart = charts[chartType.chart];
  return (
    <Wrap>
      <HeaderNav
        startDate={startDate}
        setStartDate={setStartDate}
        handleLogoutSubmit={handleLogoutSubmit}
      ></HeaderNav>
      <Container>
        <Articles>
          {chartInfoList.map((v, idx) => (
            <Item
              key={idx}
              text={v}
              onClick={async () => {
                handleChartType(v);
                setChartData(undefined);
                await getChartData(v.url);
              }}
            ></Item>
          ))}
        </Articles>
        <Content>
          <ChartContainer>
            {chartData !== undefined && chartType.url !== '' && (
              <Chart
                key={chartType.url}
                options={chartOptions[chartType.url].options}
                data={chartData}
              />
            )}
          </ChartContainer>
        </Content>
      </Container>
    </Wrap>
  );
}

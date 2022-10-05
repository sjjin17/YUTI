import React from 'react';
import styled from '@emotion/styled';
import HeaderNav from '../molecule/HeaderNav';
import Item from '../atom/Item';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import Heading from '../atom/Heading';

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  background-color: #fafafa;
  margin: 0;
  grid-template-rows: 70px auto;
`;
const Container = styled.div`
  display: grid;
  width: 1440px;
  margin: 0 auto;
  grid-template-columns: 250px auto;

  @keyframes loading {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(15px);
    }
  }
`;

const Articles = styled.div`
  background: white;
  border-right: 1px solid rgb(0, 0, 0, 0.2);
  border-left: 1px solid rgb(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
`;

const Content = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  padding: 48px 56px 260px;
  .loading span {
    display: inline-block;
    margin: 0 -0.05em;
    animation: loading 0.7s infinite;
  }
  .loading span:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading span:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading span:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loading span:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loading span:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loading span:nth-child(7) {
    animation-delay: 0.6s;
  }
`;

const ChartContainer = styled.div`
  border: 1px solid rgb(233, 233, 234);
  border-radius: 10px;
  background-color: white;
  padding: 32px;
  margin-top: 32px;
  align-items: center;
  min-height: 0px;
  width: 1000px;
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
  loading,
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
          {loading ? (
            <div
              className="loading"
              style={{
                fontSize: '70px',
                marginTop: '100px',
                color: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              {'LOADING'.split('').map(v => (
                <span key={v} style={{ margin: '10px' }}>
                  {v}
                </span>
              ))}
            </div>
          ) : (
            <>
              {chartData !== undefined && chartType.url !== '' && (
                <>
                  <Heading text={chartType.value} fontSize="30px"></Heading>
                  <ChartContainer>
                    <Chart
                      key={chartType.url}
                      options={chartOptions[chartType.url].options}
                      data={chartData}
                    />
                  </ChartContainer>
                </>
              )}
            </>
          )}
        </Content>
      </Container>
    </Wrap>
  );
}

import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ManagerTemplate from '../template/ManagerTemplate';
import Router from 'next/router';
import managerAxios from '../utils/managerAxios';

const Container = styled.div`
  width: 98vw;
  height: 98vh;
`;

const chartInfoList = [
  { chart: 'line', value: '서비스 여정도', url: 'plan' },
  { chart: 'bar', value: '공유하기 클릭 빈도', url: 'share' },
  { chart: 'bar', value: '문항별 소요 시간', url: '' },
  { chart: 'pie', value: '카카오톡 유입 경로', url: 'kakao' },
  { chart: 'radar', value: 'MBTI 선호도', url: '' },
];

const chartOptions = {
  plan: {
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '서비스 여정도',
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  },
  share: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '카카오 유입 경로',
        },
      },
    },
  },
  // 백엔드에서 url 뭐로줄지 정해지지 않았음 (문항별 소요 시간)
  _: { options: {} },
  kakao: {
    labels: ['etc', 'facebook', 'kakao', 'line', 'twitter'],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '공유 횟수',
        },
      },
    },
  },
  // 백엔드에서 url 뭐로줄지 정해지지 않았음 (MBTI 선호도)
  __: { options: {} },
};

export default function Manager() {
  const [chartType, setChartType] = useState({ chart: '', value: '', url: '' });
  const [startDate, setStartDate] = useState('');
  const [chartData, setChartData] = useState(undefined);
  const isLogin = !!localStorage.getItem('token');
  useEffect(() => {
    setStartDate(new Date());
    return () => {
      if (!isLogin) {
        Router.push({ pathname: '/login' });
      }
    };
  }, [isLogin]);

  const handleChartType = data => {
    setChartType({ ...data });
  };

  const handleLogoutSubmit = async () => {
    try {
      await managerAxios.post('/analytics/v1/accounts/logout', {
        id: 'admin',
        password: 'yuti1234',
      });
      localStorage.removeItem('token');
      Router.push('/login');
    } catch {}
  };

  const handleSetChartData = (data, type) => {
    switch (type) {
      case 'plan':
        setChartData({
          labels: [
            '시작',
            'Q1',
            'Q2',
            'Q3',
            'Q4',
            'Q5',
            'Q6',
            'Q7',
            'Q8',
            'Q9',
            'Q10',
            'Q11',
            'Q12',
            '결과',
          ],
          datasets: [
            {
              label: 'green',
              data: data[0].result,
              borderColor: 'rgb(255, 99 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'red',
              data: data[1].result,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
        break;
      case 'share':
        setChartData({
          labels: ['etc', 'facebook', 'kakao', 'line', 'twitter'],
          datasets: [
            {
              label: '',
              data: data.result,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
            },
          ],
        });
        break;
      //문항별 소요 시간
      case '':
        break;
      case 'kakao':
        setChartData({
          labels: ['결과 보러가기', '메인으로 가기'],
          datasets: [
            {
              label: '',
              data: data.shareResult,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        });
        break;
      //MBTI별 선호도
      case '':
        break;
    }
  };

  const getChartData = async value => {
    try {
      const { data } = await managerAxios.get(
        `/analytics/v1/analysis/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      handleSetChartData(data.data, value);
    } catch {}
  };

  return (
    <>
      {isLogin && (
        <Container>
          <ManagerTemplate
            chartInfoList={chartInfoList}
            chartType={chartType}
            handleChartType={handleChartType}
            startDate={startDate}
            setStartDate={setStartDate}
            handleLogoutSubmit={handleLogoutSubmit}
            getChartData={getChartData}
            chartData={chartData}
            chartOptions={chartOptions}
            setChartData={setChartData}
          />
        </Container>
      )}
    </>
  );
}

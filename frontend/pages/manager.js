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
  { chart: 'bar', value: '문항별 소요 시간', url: 'time' },
  { chart: 'pie', value: '카카오톡 유입 경로', url: 'kakao' },
  { chart: 'radar', value: 'MBTI 선호도', url: 'category' },
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
  time: {
    labels: [
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
    ],
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
  category: {
    options: {
      labels: [
        'ISTJ',
        'INTP',
        'ESTJ',
        'ISTP',
        'ENTP',
        'ESTP',
        'INFJ',
        'ISFJ',
        'ENFJ',
        'INFP',
        'ESFJ',
        'ENFP',
        'ISFP',
        'ESFP',
        'INTJ',
        'ENTJ',
      ],
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
  },
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
              borderColor: 'rgb(103, 209, 147)',
              backgroundColor: 'rgba(103, 209, 147, 0.7)',
            },
            {
              label: 'red',
              data: data[1].result,
              borderColor: 'rgb(252, 125, 113)',
              backgroundColor: 'rgba(252, 125, 113, 0.7)',
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
      case 'time':
        setChartData({
          labels: [
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
          ],
          datasets: [
            {
              label: '',
              data: data.result,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
        break;
      case 'kakao':
        setChartData({
          labels: ['결과 보러가기', '메인으로 가기'],
          datasets: [
            {
              label: '',
              data: data.result,
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
      case 'category':
        setChartData({
          labels: ['게임', '엔터', '스포츠', '음식', '지식', '라이프스타일'],
          datasets: [
            {
              label: 'ISTJ',
              data: data.result['ISTJ'],
              borderColor: 'rgb(163, 98, 159)',
              backgroundColor: 'rgba(163, 98, 159, 0.7)',
            },
            {
              label: 'INTP',
              data: data.result['INTP'],
              borderColor: 'rgb(58, 121, 160)',
              backgroundColor: 'rgba(58, 121, 160, 0.7)',
              hidden: true,
            },
            {
              label: 'ESTJ',
              data: data.result['ESTJ'],
              borderColor: 'rgb(237, 181, 64)',
              backgroundColor: 'rgba(237, 181, 64, 0.7)',
              hidden: true,
            },
            {
              label: 'ISTP',
              data: data.result['ISTP'],
              borderColor: 'rgb(131, 182, 96)',
              backgroundColor: 'rgba(131, 182, 96, 0.7)',
              hidden: true,
            },
            {
              label: 'ENTP',
              data: data.result['ENTP'],
              borderColor: 'rgb(157, 76, 124)',
              backgroundColor: 'rgba(157, 76, 124, 0.7)',
              hidden: true,
            },
            {
              label: 'ESTP',
              data: data.result['ESTP'],
              borderColor: 'rgb(81, 175, 174)',
              backgroundColor: 'rgba(81, 175, 174, 0.7)',
              hidden: true,
            },
            {
              label: 'INFJ',
              data: data.result['INFJ'],
              borderColor: 'rgb(226, 137, 56)',
              backgroundColor: 'rgba(226, 137, 56, 0.7)',
              hidden: true,
            },
            {
              label: 'ISFJ',
              data: data.result['ISFJ'],
              borderColor: 'rgb(112, 91, 154)',
              backgroundColor: 'rgba(112, 91, 154, 0.7)',
              hidden: true,
            },
            {
              label: 'ENFJ',
              data: data.result['ENFJ'],
              borderColor: 'rgb(50, 144, 103)',
              backgroundColor: 'rgba(50, 144, 103, 0.7)',
              hidden: true,
            },
            {
              label: 'INFP',
              data: data.result['INFP'],
              borderColor: 'rgb(207, 99, 86)',
              backgroundColor: 'rgba(207, 99, 86, 0.7)',
              hidden: true,
            },
            {
              label: 'ESFJ',
              data: data.result['ESFJ'],
              borderColor: 'rgb(118, 118, 118)',
              backgroundColor: 'rgba(118, 118, 118, 0.7)',
              hidden: true,
            },
            {
              label: 'ENFP',
              data: data.result['ENFP'],
              borderColor: 'rgb(51, 142, 201)',
              backgroundColor: 'rgba(51, 142, 201, 0.7)',
              hidden: true,
            },
            {
              label: 'ISFP',
              data: data.result['ISFP'],
              borderColor: 'rgb(109, 142, 74)',
              backgroundColor: 'rgba(109, 142, 74, 0.7)',
              hidden: true,
            },
            {
              label: 'ESFP',
              data: data.result['ESFP'],
              borderColor: 'rgb(188, 105, 153)',
              backgroundColor: 'rgba(188, 105, 153, 0.7)',
              hidden: true,
            },
            {
              label: 'INTJ',
              data: data.result['INTJ'],
              borderColor: 'rgb(167, 123, 71)',
              backgroundColor: 'rgba(167, 123, 71, 0.7)',
              hidden: true,
            },
            {
              label: 'ENTJ',
              data: data.result['ENTJ'],
              borderColor: 'rgb(131, 128, 198)',
              backgroundColor: 'rgba(131, 128, 198, 0.7)',
              hidden: true,
            },
          ],
        });
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
      console.log(data.data);
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

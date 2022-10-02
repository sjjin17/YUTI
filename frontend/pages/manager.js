import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ManagerTemplate from '../template/ManagerTemplate';
import Router from 'next/router';
import managerAxios from '../utils/managerAxios';

const Container = styled.div`
  width: 98vw;
  height: 98vh;
`;

const data = [
  '서비스 여정도',
  '공유하기 클릭 빈도',
  '문항별 소요 시간',
  '카카오톡 유입 경로',
  'MBTI 선호도',
];

export default function Manager() {
  const [chartType, setChartType] = useState({ type: '' });
  const [startDate, setStartDate] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setStartDate(new Date());
    setIsLogin(!!localStorage.getItem('token'));
    // if (!isLogin) {
    //   Router.push({ pathname: '/login' });
    // }
  }, [isLogin]);

  const handleChartType = value => {
    setChartType({ type: value });
  };

  const handleLogoutSubmit = () => {
    try {
      managerAxios.post('/analytics/v1/accounts/logout', {
        id: 'admin',
        password: 'yuti1234',
      });
      localStorage.removeItem('token');
      Router.push('/');
    } catch {}
  };
  return (
    <>
      {!isLogin && (
        <Container>
          <ManagerTemplate
            data={data}
            chartType={chartType}
            handleChartType={handleChartType}
            startDate={startDate}
            setStartDate={setStartDate}
            handleLogoutSubmit={handleLogoutSubmit}
          />
        </Container>
      )}
    </>
  );
}

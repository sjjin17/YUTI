import React, { useState } from 'react';
import LoginTemplate from '../template/LoginTemplate';
import managerAxios from '../utils/managerAxios';
import Router from 'next/router';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeId = e => {
    setId(e);
  };
  const handleChangePassword = e => {
    setPassword(e);
  };
  const handleLoginSubmit = async () => {
    try {
      const credentials = {
        id: id,
        password: password,
      };
      const { data } = await managerAxios.post(
        '/analytics/v1/accounts/login',
        credentials,
      );
      localStorage.setItem('token', data.data);
      Router.push({ pathname: '/manager' });
    } catch {}
  };
  return (
    <LoginTemplate
      handleChangeId={handleChangeId}
      handleChangePassword={handleChangePassword}
      handleLoginSubmit={handleLoginSubmit}
    />
  );
}

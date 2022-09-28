import React, { useState } from 'react';
import LoginTemplate from '../template/LoginTemplate';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeId = e => {
    setId(e);
  };
  const handleChangePassword = e => {
    setPassword(e);
  };
  return (
    <LoginTemplate
      handleChangeId={handleChangeId}
      handleChangePassword={handleChangePassword}
    />
  );
}

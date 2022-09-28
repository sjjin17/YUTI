import React from 'react';
import styled from '@emotion/styled';

const BaseLayout = styled.div`
  background: white;
  text-align: center;
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default function Layout({ children }) {
  return <BaseLayout>{children}</BaseLayout>;
}

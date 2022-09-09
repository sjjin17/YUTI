import React from 'react';
import styled from '@emotion/styled';

const BaseLayout = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  text-align: center;
  @media (min-width: 650px) {
    padding: 0 calc((100% - 650px) / 2);
  }
`;
export default function Layout({ children }) {
  return <BaseLayout>{children}</BaseLayout>;
}

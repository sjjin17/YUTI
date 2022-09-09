import React from 'react';
import styled from '@emotion/styled';

const BaseLayout = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: grid;
  align-items: center;
  @media (min-width: 600px) {
    width: 600px;
    padding: 0 calc((100% - 600px) / 2);
  }
`;
export default function Layout({ children }) {
  return <BaseLayout>{children}</BaseLayout>;
}

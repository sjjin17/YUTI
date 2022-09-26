import React from 'react';
import styled from '@emotion/styled';
import { MAIN_COLOR } from '../const';

const BaseLayout = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 20px 30px 20px 30px;
  @media (min-width: 600px) {
    width: 600px;
    padding: 0 calc((100% - 600px) / 2);
  }
`;
export default function Layout({ children }) {
  return (
    <BaseLayout id={MAIN_COLOR === '#67D193' ? 'GREEN' : 'PINK'}>
      {children}
    </BaseLayout>
  );
}

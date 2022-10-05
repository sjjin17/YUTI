import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 50px;
  width: 200px;
  &:hover {
    background: ${({ theme }) => theme.colors.main};
    border: 0 solid;
    color: white;
    cursor: pointer;
  }
`;

export default function Item({ text, onClick }) {
  return <Container onClick={onClick}>{text.value}</Container>;
}

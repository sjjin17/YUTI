import React from 'react';
import styled from '@emotion/styled';

const ButtonBase = styled.button`
  background: white;
  color: black;
  border-radius: 10px;
  border: 0 solid;
  white-space: pre-line;
  background: ${({ theme }) => theme.colors.main};
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
export default function StaticButton({ text, height, width }) {
  return <ButtonBase style={{ width, height }}>{text}</ButtonBase>;
}

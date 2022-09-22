import React from 'react';
import styled from '@emotion/styled';
import { MAIN_COLOR } from '../const';

const ButtonBase = styled.button`
  background: white;
  color: black;
  border-radius: 10px;
  border: 0 solid;
  box-sizing: border-box;
  white-space: pre-line;
  background: ${MAIN_COLOR};
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
export default function StaticButton({ text, height, width }) {
  return <ButtonBase style={{ width, height }}>{text}</ButtonBase>;
}

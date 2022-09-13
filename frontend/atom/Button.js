import React from 'react';
import styled from '@emotion/styled';
import { MAIN_COLOR } from '../const';

const ButtonBase = styled.button`
  background: white;
  color: black;
  border-radius: 10px;
  border-color: rgb(0, 0, 0, 0.2);
  height: 15vh;
  box-sizing: border-box;
  &:hover {
    background: ${MAIN_COLOR};
    border: 0 solid;
    color: white;
  }

  @media (min-height: 700px) {
    height: 105px;
  }

  @media (max-width: 571px) {
    font-size: 4vw;
  }
  @media (min-width: 571px) {
    font-size: 22px;
  }
`;

export default function Button({ text, onClick }) {
  return (
    <>
      <ButtonBase onClick={onClick}>{text}</ButtonBase>
    </>
  );
}

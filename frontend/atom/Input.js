import React from 'react';
import styled from '@emotion/styled';
import { MAIN_COLOR } from '../const';

const InputContainer = styled.input`
  width: 100%;
  height: 100%;
  border: solid 2px;
  border-color: rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  &: hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: solid 2px;
    border-color: ${MAIN_COLOR};
  }
`;

export default function Input({ text, onChange }) {
  return (
    <InputContainer
      placeholder={text}
      onChange={e => onChange(e.target.value)}
    ></InputContainer>
  );
}

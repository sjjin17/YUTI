import React from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.input`
  width: 100%;
  height: 100%;
  border: solid 2px;
  border-color: rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  padding-left: 10px;
  &: hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: solid 2px;
    border-color: ${({ theme }) => theme.colors.main};
  }
`;

export default function Input({ text, onChange, type = 'text' }) {
  return (
    <InputContainer
      placeholder={text}
      onChange={e => onChange(e.target.value)}
      type={type}
    ></InputContainer>
  );
}

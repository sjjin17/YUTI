import React from 'react';
import styled from '@emotion/styled';

const Text = styled.div`
  color: black;
  text-align: left;
  font-weight: bold;
  font-size: 30px;
  @media (min-width: 571px) {
    width: 571px;
`;
export default function Heading({ text, color = 'black' }) {
  return <Text style={{ color }}>{text}</Text>;
}

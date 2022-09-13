import React from 'react';
import styled from '@emotion/styled';

const Text = styled.div`
  color: black;
  font-weight: bold;
`;
export default function Heading({
  text,
  color = 'black',
  fontSize = 30,
  textAlign = 'left',
}) {
  return <Text style={{ color, fontSize, textAlign }}>{text}</Text>;
}

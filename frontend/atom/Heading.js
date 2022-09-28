import React from 'react';
import styled from '@emotion/styled';

const Text = styled.div`
  color: ${({ highlighted, theme }) =>
    highlighted ? theme.colors.main : 'black'};
  strong {
    color: ${({ theme }) => theme.colors.main};
  }
`;
export default function Heading({
  text,
  fontSize = 25,
  textAlign = 'left',
  fontWeight = 'bold',
  highlighted = false,
}) {
  return (
    <Text style={{ fontSize, textAlign, fontWeight }} highlighted={highlighted}>
      {text}
    </Text>
  );
}

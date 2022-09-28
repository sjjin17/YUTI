import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  height: 10px;
  width: 100%;
  border-style: solid;
  border-color: rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
`;

const Range = styled.div`
  position: absolute;
  left: -1px;
  height: 10px;
  width: ${props => props.surveyNum}%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.main};
`;

export default function RangeBar({ surveyNum }) {
  return (
    <Container>
      <Range surveyNum={(surveyNum + 1) * 8.388888}></Range>
    </Container>
  );
}

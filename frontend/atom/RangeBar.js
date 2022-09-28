import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  height: 10px;
  width: 100%;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 10px;
  position: relative;
`;

const Range = styled.div`
  position: absolute;
  height: 8px;
  width: ${props => (props.surveyNum * 100) / 12}%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.main};
`;

export default function RangeBar({ surveyNum }) {
  return (
    <Container>
      <Range surveyNum={surveyNum + 1}></Range>
    </Container>
  );
}

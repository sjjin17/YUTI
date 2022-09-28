import styled from '@emotion/styled';
import React from 'react';

const RangeContainer = styled.div`
  width: 50px;
  color: rgb(0, 0, 0, 0.6);
  border-radius: 10px;
  margin: 8px auto;
`;

export default function RangeNum({ surveyNum }) {
  return <RangeContainer>{surveyNum + 1}/12</RangeContainer>;
}

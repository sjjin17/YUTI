import styled from '@emotion/styled';
import React from 'react';

const RangeContainer = styled.div`
  width: 40px;
  border-style: solid;
  border-color: rgb(0, 0, 0, 0.2);
  color: rgb(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 5px auto;
`;

export default function RangeNum({ surveyNum }) {
  return <RangeContainer>{surveyNum + 1}/12</RangeContainer>;
}

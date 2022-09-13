import React from 'react';
import styled from '@emotion/styled';

const AutoSearchContainer = styled.div`
  z-index: 3;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  border: 2px solid;
  margin-top: 2.5%;
  margin-bottom: 5%;
`;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default function AutoSearch() {
  return (
    <AutoSearchContainer>
      <ul>
        <AutoSearchData></AutoSearchData>
      </ul>
    </AutoSearchContainer>
  );
}

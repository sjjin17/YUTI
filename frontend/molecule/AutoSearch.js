import React from 'react';
import styled from '@emotion/styled';
import AutoSearchData from './AutoSearchData';

const AutoSearchContainer = styled.div`
  z-index: 3;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  border: 2px solid;
  margin-top: 2.5%;
  margin-bottom: 5%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const AutoSearchWrap = styled.ul`
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
`;

export default function AutoSearch({ previewList, addThumbnail }) {
  return (
    <AutoSearchContainer>
      <AutoSearchWrap>
        {previewList.map((youtuber, idx) => (
          <AutoSearchData
            key={idx}
            youtuber={youtuber}
            addThumbnail={addThumbnail}
          ></AutoSearchData>
        ))}
      </AutoSearchWrap>
    </AutoSearchContainer>
  );
}

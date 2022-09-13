import React from 'react';
import styled from '@emotion/styled';
import Heading from './Heading';

const AutoSearchDataContainer = styled.li`
  width: 100%;
  height: 25%;
  display: flex;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TextContainer = styled.div`
  display: flex;
  padding: 2px 16px;
  flex-direction: column;
`;

const ThumbnailImage = styled.img`
  border-radius: 10%;
  width: 80%;
  height: 80%;
  object-fit: cover;
`;

export default function AutoSearchData({ youtuber }) {
  return (
    <AutoSearchDataContainer>
      <ThumbnailContainer>
        <ThumbnailImage src={youtuber.Thumbnail}></ThumbnailImage>
      </ThumbnailContainer>
      <TextContainer>
        <Heading text={youtuber.name}></Heading>
        <p>구독자:{youtuber.subscribers}명</p>
      </TextContainer>
    </AutoSearchDataContainer>
  );
}

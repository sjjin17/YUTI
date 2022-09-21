import React from 'react';
import styled from '@emotion/styled';
import Heading from '../atom/Heading';

const AutoSearchDataContainer = styled.li`
  width: 100%;
  height: 25%;
  display: flex;
  margin: 2% auto;
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
  flex-direction: column;
  margin: 0 5px;
`;

const ThumbnailImage = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
  @media (max-width: 571px) {
    width: 10vw;
    height: 10vw;
  }
`;

export default function AutoSearchData({ youtuber, addSelected }) {
  return (
    <AutoSearchDataContainer onClick={() => addSelected(youtuber)}>
      <ThumbnailContainer>
        <ThumbnailImage src={youtuber.Thumbnail}></ThumbnailImage>
      </ThumbnailContainer>
      <TextContainer>
        <Heading text={youtuber.name}></Heading>
        <Heading
          text={`구독자: ${youtuber.subscribers}명`}
          fontSize="15px"
          fontWeight="normal"
        ></Heading>
      </TextContainer>
    </AutoSearchDataContainer>
  );
}

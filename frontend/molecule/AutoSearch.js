import React from 'react';
import styled from '@emotion/styled';
import AutoSearchData from './AutoSearchData';
import Heading from '../atom/Heading';
import { MAIN_COLOR } from '../const';

const AutoSearchContainer = styled.div`
  z-index: 3;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  border: 2px hidden;
  margin-top: 2.5%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: block;
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${MAIN_COLOR};
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end{
    background: transparent
    margin-bottom: 10px;
  }
`;

const AutoSearchWrap = styled.ul`
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 5% auto;
`;

const FailedMessage = styled.li`
  text-align: left;
`;

export default function AutoSearch({
  searchResultList,
  addSelected,
  searchInput,
}) {
  return (
    <AutoSearchContainer>
      {searchResultList.length > 0 ? (
        <AutoSearchWrap>
          <Heading text="검색결과" color={MAIN_COLOR} fontSize="20px"></Heading>
          {searchResultList.map((youtuber, idx) => (
            <AutoSearchData
              key={idx}
              youtuber={youtuber}
              addSelected={addSelected}
            ></AutoSearchData>
          ))}
        </AutoSearchWrap>
      ) : (
        <>
          <Heading
            text={
              <>
                <strong>{searchInput}</strong>에 대한
              </>
            }
            textAlign="center"
          ></Heading>
          <Heading text="검색결과가 없습니다." textAlign="center"></Heading>
          <TextContainer>
            <Heading text="제안:"></Heading>
            <ul>
              <FailedMessage>
                단어의 철자가 정확한지 확인해 보세요
              </FailedMessage>
              <FailedMessage>다른 검색어를 사용해 보세요</FailedMessage>
            </ul>
          </TextContainer>
        </>
      )}
    </AutoSearchContainer>
  );
}

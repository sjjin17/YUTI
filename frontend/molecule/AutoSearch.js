import React from 'react';
import styled from '@emotion/styled';
import AutoSearchData from './AutoSearchData';
import Heading from '../atom/Heading';

const AutoSearchContainer = styled.div`
  z-index: 3;
  width: 100%;
  height: 45vh;
  background-color: #fff;
  border: 2px hidden;
  margin-top: 2%;
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
    background-color: rgb(0, 0, 0, 0.1);
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end{
    background: transparent
    margin-bottom: 10px;
  }
`;

const AutoSearchWrap = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0px;
  margin: 2% 0;
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
  page,
  isLoaded,
}) {
  return (
    <AutoSearchContainer>
      {searchResultList.length > 0 ? (
        <AutoSearchWrap>
          <Heading text="검색결과" fontSize="20px" highlighted></Heading>
          {searchResultList.map((youtuber, idx) => (
            <AutoSearchData
              key={idx}
              youtuber={youtuber}
              addSelected={addSelected}
            ></AutoSearchData>
          ))}
          {isLoaded && (
            <div className={`${page}페이지`}>더 이상 검색결과가 없습니다.</div>
          )}
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
              <FailedMessage>
                유튜버 이름의 정확한 언어를 확인해주세요. {`(엠넷(X) Mnet(O))`}
              </FailedMessage>
            </ul>
          </TextContainer>
        </>
      )}
    </AutoSearchContainer>
  );
}

import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  height: 50px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  border-width: 0 0 1px 0;
  width: 100%;
  height: 100%;
  font-size: 20px;
  ::placeholder {
    text-align: center;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;

export default function SearchBar({ setSearchInput }) {
  return (
    <Container>
      <SearchInput
        placeholder="구독하고 있는 유튜버를 검색해보세요"
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      ></SearchInput>
    </Container>
  );
}

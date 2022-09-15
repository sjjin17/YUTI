import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  height: 10px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  border-width: 0 0 1px 0;
  width: 100%;
`;

export default function SearchBar({ setSearchInput }) {
  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  return (
    <Container>
      <SearchInput
        placeholder="구독하고 있는 유튜버를 검색해보세요"
        onChange={handleSearchInput}
      ></SearchInput>
    </Container>
  );
}

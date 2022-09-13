import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

const Container = styled.div`
  height: 10px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 100%;
`;

export default function SearchBar({ searchState, setSearchState }) {
  const [searchInput, setSearchInput] = useState('');

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  useEffect(() => {
    if (searchInput && !searchState) {
      setSearchState(1);
    } else if (!searchInput) {
      setSearchState(0);
    }
  }, [searchInput]);

  return (
    <Container>
      <SearchInput
        placeholder="구독하고 있는 유튜버를 검색해보세요"
        onChange={handleSearchInput}
      ></SearchInput>
    </Container>
  );
}

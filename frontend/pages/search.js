import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchTemplate from '../template/SearchTemplate';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function Search() {
  const [searchState, setSearchState] = useState(false);
  const [hoverState, setHoverState] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const buttonText = ['건너뛰기', '도와주세요'];

  function mouseHover() {
    setHoverState(1);
  }

  function mouseOut() {
    setHoverState(0);
  }

  useEffect(() => {
    if (searchInput && !searchState) {
      setSearchState(true);
    } else if (!searchInput) {
      setSearchState(false);
    }
  }, [searchInput]);

  return (
    <>
      <Container>
        <SearchTemplate
          searchState={searchState}
          hoverState={hoverState}
          mouseHover={mouseHover}
          mouseOut={mouseOut}
          buttonText={buttonText}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        ></SearchTemplate>
      </Container>
    </>
  );
}

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchTemplate from '../template/SearchTemplate';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function Search() {
  const [searchState, setSearchState] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [buttonText, setButtonText] = useState('건너뛰기');

  function handleHover() {
    setHoverState(!hoverState);
  }

  useEffect(() => {
    if (searchInput && !searchState) {
      setSearchState(true);
    } else if (!searchInput) {
      setSearchState(false);
    }
  }, [searchInput]);

  useEffect(() => {
    hoverState ? setButtonText('도와주세요') : setButtonText('건너뛰기');
  }, [hoverState]);

  return (
    <>
      <Container>
        <SearchTemplate
          searchState={searchState}
          hoverState={hoverState}
          handleHover={handleHover}
          buttonText={buttonText}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        ></SearchTemplate>
      </Container>
    </>
  );
}
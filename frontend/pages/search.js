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
  const [selectedList, setSelectedList] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);

  function addSelected(youtuber) {
    if (!selectedList.includes(youtuber)) {
      setSelectedList(prev => {
        return [...prev, youtuber];
      });
    }
  }

  function delSelected(youtuber) {
    setSelectedList(prev => prev.filter(selected => selected !== youtuber));
  }

  function handleHover() {
    setHoverState(!hoverState);
  }

  useEffect(() => {
    // 임시코드, 이후 통신 코드로 수정
    if (searchInput === '실패') {
      setSearchResultList([]);
    } else {
      setSearchResultList(tempYoutubers);
    }
  }, [searchInput]);

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
          searchResultList={searchResultList}
          selectedList={selectedList}
          addSelected={addSelected}
          delSelected={delSelected}
        ></SearchTemplate>
      </Container>
    </>
  );
}

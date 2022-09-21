import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchTemplate from '../template/SearchTemplate';

const tempYoutubers = [
  { Thumbnail: 'images/firstRank.png', name: '1번', subscribers: '1' },
  { Thumbnail: 'images/secondRank.png', name: '2번', subscribers: '2' },
  {
    Thumbnail:
      'https://yt3.ggpht.com/ytc/AMLnZu-OoCj8oG4hssfpUAvZ5EPCjBu21krVcB6tkVFsQA=s176-c-k-c0x00ffffff-no-rj-mo',
    name: '3번',
    subscribers: '3',
  },
  { Thumbnail: 'images/thirdRank.png', name: '4번', subscribers: '4' },
  { Thumbnail: 'images/thirdRank.png', name: '3번', subscribers: '3' },
  { Thumbnail: 'images/thirdRank.png', name: '3번', subscribers: '3' },
  { Thumbnail: 'images/thirdRank.png', name: '3번', subscribers: '3' },
];

export default function Search() {
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
    <SearchTemplate
      hoverState={hoverState}
      handleHover={handleHover}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchResultList={searchResultList}
      selectedList={selectedList}
      addSelected={addSelected}
      delSelected={delSelected}
    ></SearchTemplate>
  );
}

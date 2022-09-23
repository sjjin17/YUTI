import { useState, useEffect, useCallback, useRef } from 'react';
import SearchTemplate from '../template/SearchTemplate';
import axios from '../utils/axios';

const tempYoutubers = [
  { thumbnail: 'images/firstRank.png', channelName: '1번' },
  { thumbnail: 'images/secondRank.png', channelName: '2번' },
  {
    thumbnail:
      'https://yt3.ggpht.com/ytc/AMLnZu-OoCj8oG4hssfpUAvZ5EPCjBu21krVcB6tkVFsQA=s176-c-k-c0x00ffffff-no-rj-mo',
    name: '3번',
  },
  { thumbnail: 'images/thirdRank.png', channelName: '4번' },
  { thumbnail: 'images/thirdRank.png', channelName: '5번' },
  { thumbnail: 'images/thirdRank.png', channelName: '6번' },
  { thumbnail: 'images/thirdRank.png', channelName: '7번' },
];

export default function Search() {
  const [hoverState, setHoverState] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedList, setSelectedList] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [page, setPage] = useState(0);
  const [io, setIo] = useState(null);

  const fetchResultList = () => {
    if (searchInput) {
      setSearchResultList(prev => {
        return [...prev, ...tempYoutubers];
      });
    } else {
      setSearchResultList([]);
      setPage(0);
    }
  };

  const registerObservingEl = el => {
    io.observe(el);
  };

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

  function setScrollTarget() {
    const currentTargetClass = `${page}페이지`;
    const target = document.getElementsByClassName(currentTargetClass)[0];
    if (target) {
      registerObservingEl(target);
    }
  }
  useEffect(() => {
    setScrollTarget();
  }, [io]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage(page + 1);
          if (io !== null) {
            io.disconnect();
          }
        }
      });
    });
    setIo(targetObserver);
    fetchResultList();
  }, [page, searchInput]);

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
      page={page}
    ></SearchTemplate>
  );
}

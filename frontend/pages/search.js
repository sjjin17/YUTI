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
  const [isLoaded, setIsLoaded] = useState(true);

  const fetchResultList = async () => {
    if (page === 1) {
      return;
    } else if (searchInput) {
      try {
        const params = {
          keyword: searchInput,
          offset: searchResultList.length,
        };
        const { data } = await axios.get(`api/v1/youtubers/`, {
          params,
        });
        setSearchResultList(prev => {
          return [...prev, ...data.data];
        });
        if (!page) {
          setPage(1);
          setIsLoaded(false);
        }
      } catch {
        setSearchResultList([]);
        setPage(0);
      }
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
    if (searchResultList.length) {
      setIsLoaded(true);
    }
  }, [searchResultList.length]);

  useEffect(() => {
    if (isLoaded) {
      setScrollTarget();
    }
  }, [isLoaded]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoaded(false);
          setPage(page + 1);
          if (io !== null) {
            io.disconnect();
          }
        }
      });
    });
    setIo(targetObserver);
    fetchResultList();
  }, [page]);

  useEffect(() => {
    if (searchInput) {
      setSearchResultList([]);
      setPage(0);
      fetchResultList();
    }
    axios
      .get(`api/v1/youtubers/${searchInput}`)
      .then(res => {
        setSearchResultList(res.data.data);
      })
      .catch(setSearchResultList([]));
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
      page={page}
      isLoaded={isLoaded}
    ></SearchTemplate>
  );
}

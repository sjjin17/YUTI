import Heading from '../atom/Heading';
import Button from '../atom/Button';
import styled from '@emotion/styled';
import SearchBar from '../atom/SearchBar';
import AutoSearch from '../molecule/AutoSearch';
import MyYoutubers from '../molecule/MyYoutubers';

const Container = styled.div`
  width: 100%;
  min-width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 5fr 60px;
  @media (min-height: 700px) {
    height: 630px;
  }
  @media (min-width: 571px) {
    width: 571px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 100%;
    height: 100%;
  }
`;

export default function SearchTemplate({
  searchInput,
  handleHover,
  setSearchInput,
  hoverState,
  searchResultList,
  selectedList,
  addSelected,
  delSelected,
  page,
  isLoaded,
  sendSelectedList,
  handleSendLog,
}) {
  return (
    <Container>
      {searchInput || selectedList.length > 0 ? (
        <TitleContainer>
          <TextContainer>
            <Heading text="더 나은 추천을 위해 데이터를 쌓아주세요"></Heading>
          </TextContainer>
          <TextContainer>
            <Heading
              text="내가 좋아하는 유튜브 채널"
              fontSize="20px"
              highlighted
            ></Heading>
          </TextContainer>
          <MyYoutubers
            selectedList={selectedList}
            delSelected={delSelected}
          ></MyYoutubers>
        </TitleContainer>
      ) : (
        <TitleContainer>
          <TextContainer>
            <Heading
              text={
                <>
                  즐겨보는 <strong>유튜버</strong>를 알려주세요
                </>
              }
            ></Heading>
          </TextContainer>
          <TextContainer>
            <Heading
              text="MBTI별 유튜버를 정확히 추천하기 위해서는 많은 데이터가 필요해요. 더 나은 성능을 위해 데이터를 입력해주세요."
              fontWeight="normal"
              fontSize="20px"
            ></Heading>
          </TextContainer>
        </TitleContainer>
      )}
      <SearchContainer>
        <SearchBar setSearchInput={setSearchInput}></SearchBar>

        {searchInput && (
          <AutoSearch
            searchResultList={searchResultList}
            addSelected={addSelected}
            searchInput={searchInput}
            page={page}
            isLoaded={isLoaded}
          ></AutoSearch>
        )}
      </SearchContainer>
      {selectedList.length > 0 ? (
        <ButtonContainer>
          <Button
            text="선택완료"
            onClick={() => {
              sendSelectedList();
              handleSendLog();
            }}
          ></Button>
        </ButtonContainer>
      ) : (
        <>
          <ButtonContainer onMouseOver={handleHover} onMouseOut={handleHover}>
            <Button
              text={hoverState ? '도와주세요' : '건너뛰기'}
              onClick={() => {
                sendSelectedList();
                handleSendLog();
              }}
            ></Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

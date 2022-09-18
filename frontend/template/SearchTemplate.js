import Heading from '../atom/Heading';
import Button from '../atom/Button';
import styled from '@emotion/styled';
import SearchBar from '../atom/SearchBar';
import AutoSearch from '../molecule/AutoSearch';
import MyYoutubers from '../molecule/MyYoutubers';
import { MAIN_COLOR } from '../const';

const Container = styled.div`
  width: 80%;
  min-width: 80%;
  height: 90%;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 3fr 5fr 2fr 60px;
  @media (min-height: 700px) {
    height: 630px;
  }
  @media (min-width: 571px) {
    width: 571px;
  }
`;

const TextContainer = styled.div`
  width: 80%;
  height: 100%;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  button {
    width: 70%;
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
}) {
  return (
    <Container>
      {searchInput || selectedList.length > 0 ? (
        <div>
          <TextContainer>
            <Heading text="더 나은 추천을 위해 데이터를 쌓아주세요"></Heading>
          </TextContainer>
          <TextContainer>
            <Heading
              text="내가 좋아하는 유튜브 채널"
              color={MAIN_COLOR}
              fontSize="20px"
            ></Heading>
          </TextContainer>
          <MyYoutubers
            selectedList={selectedList}
            delSelected={delSelected}
          ></MyYoutubers>
        </div>
      ) : (
        <>
          <TextContainer>
            <Heading
              text={
                <>
                  즐겨보는 <strong>유튜버</strong>를
                </>
              }
            ></Heading>
            <Heading text="알려주세요!"></Heading>
          </TextContainer>
          <TextContainer>
            MBTI별 유튜버를 정확히 추천하기 위해서는 많은 데이터가 필요해요. 더
            나은 성능을 위해 데이터를 입력해주세요.
          </TextContainer>
        </>
      )}
      <SearchContainer>
        <SearchBar setSearchInput={setSearchInput}></SearchBar>

        {searchInput && (
          <AutoSearch
            searchResultList={searchResultList}
            addSelected={addSelected}
            searchInput={searchInput}
          ></AutoSearch>
        )}
      </SearchContainer>
      {selectedList.length > 0 ? (
        <ButtonContainer>
          <Button text="선택완료"></Button>
        </ButtonContainer>
      ) : (
        <>
          <ButtonContainer onMouseOver={handleHover} onMouseOut={handleHover}>
            <Button text={hoverState ? '도와주세요' : '건너뛰기'}></Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

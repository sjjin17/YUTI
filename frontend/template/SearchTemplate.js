import Heading from '../atom/Heading';
import Button from '../atom/Button';
import styled from '@emotion/styled';
import SearchBar from '../atom/SearchBar';
import AutoSearch from '../molecule/AutoSearch';
import { MAIN_COLOR } from '../const';

const Container = styled.div`
  width: 100%;
  min-width: 100%;
  height: 90%;
  padding: 10px 20px 0px 20px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 3fr 5fr 2fr;
  @media (min-height: 700px) {
    height: 630px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  box-sizing: border-box;
`;

export default function SearchTemplate({
  searchState,
  handleHover,
  setSearchInput,
  buttonText,
  previewList,
}) {
  return (
    <Container>
      {searchState === true ? (
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
        </div>
      ) : (
        <>
          <TextContainer>
            <Heading text="즐겨보는 유튜버를 알려주세요"></Heading>
          </TextContainer>
          <TextContainer>
            MBTI별 유튜버를 정확히 추천하기 위해서는 많은 데이터가 필요해요. 더
            나은 성능을 위해 데이터를 입력해주세요.
          </TextContainer>
        </>
      )}
      <SearchContainer>
        <SearchBar setSearchInput={setSearchInput}></SearchBar>
        {searchState && <AutoSearch previewList={previewList}></AutoSearch>}
      </SearchContainer>
      <ButtonContainer>
        <Button text="선택완료"></Button>
      </ButtonContainer>
      <ButtonContainer onMouseOver={handleHover} onMouseOut={handleHover}>
        <Button text={buttonText}></Button>
      </ButtonContainer>
    </Container>
  );
}

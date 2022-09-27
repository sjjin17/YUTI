import Heading from '../atom/Heading';
import YoutuberInfo from '../molecule/YoutuberInfo';
import KakaoShare from '../atom/KakaoShare';
import UrlShare from '../atom/URLShare';
import TextGage from '../molecule/TextGage';
import Button from '../atom/Button';
import styled from '@emotion/styled';
import Image from 'next/image';
import { MAIN_COLOR } from '../const';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 2fr 1fr 1.5fr 1.5fr 0.5fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-height: 800px) {
    height: 800px;
  }
  @media (min-width: 571px) {
    width: 571px;
  }
`;

const ResultContainer = styled.div`
  display: grid;
  width: 100%;
  @media (min-width: 350px) {
    width: 350px;
  }
  grid-template-columns: repeat(3, minmax(auto, 200px));
`;

const ShareContainer = styled.div`
  display: flex;
  width: 90%;
  @media (min-width: 450px) {
    width: 405px;
  }
  justify-content: space-evenly;
`;

const GagesContainer = styled.div`
  margin-right: 40px;
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 60%;
  box-sizing: border-box;
  button {
    width: 100%;
    height: 100%;
  }
`;

export default function ResultTemplate({
  mbti,
  mbtiResult,
  url,
  handleCopyUrl,
  handleKakaoShare,
  handleNaviMainPage,
}) {
  const mbtiImagePath = `/images/${mbti}.png`;
  const mbtiHeading = `${mbti}의 유튜버 스타일`;

  return (
    <Container>
      <Heading text={mbtiHeading} fontSize="20px" textAlign="center" />
      <Image src={mbtiImagePath} alt={mbti} width={200} height={200} />
      <Heading text={mbtiResult.desc} fontSize="20px" textAlign="center" />
      <GagesContainer>
        {Object.entries(mbtiResult.gageInfos).map((gageValue, index) => (
          <TextGage
            key={gageValue}
            text={gageValue[0]}
            gageNumber={gageValue[1]}
            index={index}
          />
        ))}
      </GagesContainer>
      <ResultContainer>
        {mbtiResult.likeYoutubers.map((youtuberInfo, idx) => (
          <YoutuberInfo
            key={idx}
            idx={idx}
            channelId={youtuberInfo.channelId}
            imageUrl={youtuberInfo.thumbnail}
            youtuberName={youtuberInfo.channelName}
          />
        ))}
      </ResultContainer>
      <Heading text="결과 공유하기" fontSize="15px" textAlign="center" />
      <ShareContainer>
        <KakaoShare onClick={handleKakaoShare} />
        <FacebookShareButton url={url}>
          <FacebookIcon size={45} round={true} borderRadius={24} />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={45} round={true} borderRadius={24} />
        </TwitterShareButton>
        <LineShareButton url={url}>
          <LineIcon size={45} round={true} borderRadius={24} />
        </LineShareButton>
        <UrlShare onClick={handleCopyUrl} />
      </ShareContainer>
      <ButtonContainer>
        <Button text="테스트 다시하기" onClick={handleNaviMainPage} />
      </ButtonContainer>
    </Container>
  );
}

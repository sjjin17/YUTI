import Heading from '../atom/Heading';
import YoutuberInfo from '../molecule/YoutuberInfo';
import KakaoShare from '../atom/KakaoShare';
import UrlShare from '../atom/UrlShare';
import TextGage from '../molecule/TextGage';
import Button from '../atom/Button';
import OtherMbti from '../molecule/OtherMbti';
import styled from '@emotion/styled';
import Image from 'next/image';
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
  grid-template-rows: 0.5fr 2fr 1fr 1.5fr 0.7fr 1.5fr 3fr 0.4fr 0.7fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-height: 1020px) {
    height: 1020px;
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

const OtherMbtiContainer = styled.div`
  display: flex;
  width: 350px;
  @media (min-width: 570px) {
    width: 500px;
  }
  justify-content: space-between;
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
  @media (min-width: 571px) {
    width: 60%;
  }
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
  handleNaviMainPage,
  handleNaviOtherMbitPage,
  sendShareLog,
}) {
  const mbtiImagePath = `/images/${mbti}.png`;
  const mbtiHeading = `${mbti}의 유튜버 스타일`;
  const mbtiLikeText = `${mbti}가 즐겨보는 유튜버`;

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
      <Heading text={mbtiLikeText} fontSize="15px" />
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
      <OtherMbtiContainer>
        {mbtiResult.otherMbti.map((mbti, idx) => (
          <OtherMbti
            key={mbti}
            idx={idx}
            mbti={mbti}
            onClick={handleNaviOtherMbitPage}
          />
        ))}
      </OtherMbtiContainer>
      <Heading text="결과 공유하기" fontSize="15px" textAlign="center" />
      <ShareContainer>
        <KakaoShare sendShareLog={sendShareLog} />
        <FacebookShareButton url={url}>
          <FacebookIcon
            size={45}
            round={true}
            borderRadius={24}
            onClick={() => {
              sendShareLog('facebook');
            }}
          />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon
            size={45}
            round={true}
            borderRadius={24}
            onClick={() => {
              sendShareLog('twitter');
            }}
          />
        </TwitterShareButton>
        <LineShareButton url={url}>
          <LineIcon
            size={45}
            round={true}
            borderRadius={24}
            onClick={() => {
              sendShareLog('line');
            }}
          />
        </LineShareButton>
        <UrlShare
          onClick={() => {
            handleCopyUrl();
            sendShareLog('etc');
          }}
        />
      </ShareContainer>
      <ButtonContainer>
        <Button text="테스트 다시하기" onClick={handleNaviMainPage} />
      </ButtonContainer>
    </Container>
  );
}

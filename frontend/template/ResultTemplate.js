import Heading from '../atom/Heading';
import YoutuberInfo from '../molecule/YoutuberInfo';
import KakaoShare from '../atom/KakaoShare';
import UrlShare from '../atom/URLShare';
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
  grid-template-rows: 0.5fr 2fr 0.5fr 2fr 1.5fr 0.5fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-height: 800px) {
    height: 750px;
  }
  @media (min-width: 571px) {
    width: 571px;
  }
`;

const ResultContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(auto, 200px));
`;

const ShareContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
`;

export default function ResultTemplate({
  mbti,
  mbtiResult,
  url,
  handleCopyUrl,
  handleKakaoShare,
}) {
  const mbtiImagePath = `/images/${mbti}.png`;

  return (
    <Container>
      <Heading text="당신의 유튜버 스타일" fontSize="20px" textAlign="center" />
      <Image src={mbtiImagePath} alt={mbti} width={200} height={200} />
      <Heading text={mbtiResult.desc} fontSize="20px" textAlign="center" />
      <Image
        src="/images/dummy.png"
        alt="dummyImage"
        width={500}
        height={200}
      />
      <ResultContainer>
        {mbtiResult.likeYoutubers.map((youtuberInfo, idx) => (
          <YoutuberInfo
            key={idx}
            idx={idx}
            imageUrl={youtuberInfo.imageUrl}
            youtuberName={youtuberInfo.youtuberName}
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
    </Container>
  );
}

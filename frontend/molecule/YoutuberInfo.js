import styled from '@emotion/styled';
import Medal from '../atom/Medal';
import YoutuberImage from '../atom/YoutuberImage';
import Heading from '../atom/Heading';

const InfoContainer = styled.div`
  position: relative;
`;

const YoutuberLink = styled.a`
  text-decoration: none;
`;

export default function ResultYoutuberInfo({
  idx,
  channelId,
  imageUrl,
  youtuberName,
}) {
  const youtuberPageUrl = `https://www.youtube.com/channel/${channelId}`;
  return (
    <InfoContainer>
      <YoutuberLink href={youtuberPageUrl} rel="noreferrer">
        <Medal idx={idx} />
        <YoutuberImage imageUrl={imageUrl} youtuberName={youtuberName} />
        <Heading text={youtuberName} fontSize="10px" textAlign="center" />
      </YoutuberLink>
    </InfoContainer>
  );
}

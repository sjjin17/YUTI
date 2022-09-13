import styled from '@emotion/styled';
import Medal from '../atom/Medal';
import YoutuberImage from '../atom/YoutuberImage';
import Heading from '../atom/Heading';

const InfoContainer = styled.div`
  position: relative;
`;

export default function ResultYoutuberInfo({ idx, imageUrl, youtuberName }) {
  return (
    <InfoContainer>
      <Medal idx={idx} />
      <YoutuberImage imageUrl={imageUrl} youtuberName={youtuberName} />
      <Heading text={youtuberName} fontSize="10px" textAlign="center" />
    </InfoContainer>
  );
}

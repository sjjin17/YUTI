import styled from '@emotion/styled';

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  @media (min-width: 571px) {
    width: 110px;
    height: 110px;
  }
`;

export default function YoutuberImage({
  imageUrl,
  youtuberName,
  width = '70px',
  height = '70px',
}) {
  return <Image style={{ width, height }} src={imageUrl} alt={youtuberName} />;
}

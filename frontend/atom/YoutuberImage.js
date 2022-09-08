import styled from '@emotion/styled';

const Image = styled.image`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

function YoutuberImage({ imageUrl, youtuberName, idx }) {
  return (
    <>
      <Image src={imageUrl} alt={youtuberName} />
    </>
  );
}

export default YoutuberImage;

import YoutuberImage from '../atom/YoutuberImage';
import BtnDel from '../atom/BtnDel';
import styled from '@emotion/styled';

const SelectedYtbContainer = styled.span`
  position: relative;
`;

export default function selectedYtb({ youtuber, delSelected }) {
  return (
    <SelectedYtbContainer>
      <BtnDel delSelected={delSelected} youtuber={youtuber}></BtnDel>
      <YoutuberImage
        imageUrl={youtuber.Thumbnail}
        youtuberName="name"
      ></YoutuberImage>
    </SelectedYtbContainer>
  );
}

import YoutuberImage from '../atom/YoutuberImage';
import BtnDel from '../atom/BtnDel';
import styled from '@emotion/styled';

const SelectedYtbContainer = styled.span`
  position: relative;
  margin: 0 1%;
`;

export default function selectedYtb({ youtuber, delSelected }) {
  return (
    <SelectedYtbContainer>
      <BtnDel delSelected={delSelected} youtuber={youtuber}></BtnDel>
      <YoutuberImage
        imageUrl={youtuber.thumbnail}
        youtuberName="name"
      ></YoutuberImage>
    </SelectedYtbContainer>
  );
}

import Gage from '../atom/gage';
import Heading from '../atom/Heading';
import styled from '@emotion/styled';

const TextGageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  justify-content: flex-end;
  @media (min-width: 500px) {
    height: 30px;
  }
`;

export default function TextGage({ text, gageNumber, index }) {
  return (
    <TextGageContainer>
      <Heading text={text} fontSize="11px" textAlign="right" />
      <Gage gageNumber={gageNumber} index={index} />
    </TextGageContainer>
  );
}

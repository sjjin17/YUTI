import styled from '@emotion/styled';

const MedalImage = styled.img`
  width: 25px;
  position: absolute;
  z-index: 1;
  top: -13px;
  @media (min-width: 571px) {
    width: 33px;
    top: -23px;
  }
`;

export default function Medal({ idx }) {
  let medalRank = '';
  switch (idx) {
    case 0:
      medalRank = 'firstRank';
      break;
    case 1:
      medalRank = 'secondRank';
      break;
    case 2:
      medalRank = 'thirdRank';
      break;
  }
  const medalImagePath = `images/${medalRank}.png`;

  return <MedalImage src={medalImagePath} alt={medalRank} />;
}

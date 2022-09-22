import styled from '@emotion/styled';
import { MAIN_COLOR, SUB_COLOR } from '../const';

const GageContainer = styled.div`
  display: flex;
  width: 200px;
  height: 17px;
  margin-left: 10px;
  @media (min-width: 500px) {
    width: 300px;
    height: 25px;
  }
`;

const GageBox = styled.div`
  border: 1px solid #a09e9f;
  border-radius: 5px;
  box-sizing: border-box;
  width: 20%;
  background-color: ${props => props.color};
`;

export default function Gage({ gageNumber, index }) {
  const emptyNumber = 5 - gageNumber;
  if (index < 3) {
    return (
      <GageContainer>
        {[...Array(gageNumber)].map((empty, idx) => (
          <GageBox key={idx} color={MAIN_COLOR} />
        ))}
        {[...Array(emptyNumber)].map((empty, idx) => (
          <GageBox key={idx} color="white" />
        ))}
      </GageContainer>
    );
  } else {
    return (
      <GageContainer>
        {[...Array(gageNumber)].map((empty, idx) => (
          <GageBox key={idx} color={SUB_COLOR} />
        ))}
        {[...Array(emptyNumber)].map((empty, idx) => (
          <GageBox key={idx} color="white" />
        ))}
      </GageContainer>
    );
  }
}

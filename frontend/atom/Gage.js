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
  return (
    <GageContainer>
      {[...Array(5)].map((_value, idx) => (
        <GageBox
          key={idx}
          color={
            idx < gageNumber ? (index < 3 ? MAIN_COLOR : SUB_COLOR) : 'white'
          }
        />
      ))}
    </GageContainer>
  );
}

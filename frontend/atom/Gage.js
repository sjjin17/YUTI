import styled from '@emotion/styled';

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
  width: 20%;
  background-color: ${({ filled, highlighted, theme }) =>
    filled ? `${highlighted ? theme.colors.sub : theme.colors.main}` : 'white'};
`;

export default function Gage({ gageNumber, highlighted }) {
  return (
    <GageContainer>
      {[...Array(5)].map((_value, idx) => (
        <GageBox
          key={idx}
          filled={idx < gageNumber}
          highlighted={highlighted}
        />
      ))}
    </GageContainer>
  );
}

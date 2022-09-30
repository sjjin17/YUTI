import Heading from '../atom/Heading';
import Image from 'next/image';
import styled from '@emotion/styled';
import { MBTI_RESULT } from '../pages/[mbti]';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 165px;
  @media (min-width: 570px) {
    width: 240px;
  }
`;

const MbtiContainer = styled.div`
  display: grid;
  margin-top: 7px;
  grid-template-rows: 0.7fr 1fr 4fr;
  justify-items: center;
  align-items: center;
  box-shadow: 1px 1px 5px 0px #e3e3e3;
  background-color: white;
  border-radius: 10px;
`;

export default function OtherMbti({ idx, mbti }) {
  const mbtiImagePath = `/images/${mbti}.png`;
  return (
    <Container>
      <Heading
        text={idx ? '환장의 케미' : '환상의 케미'}
        fontSize="15px"
        fontWeight="500"
      />
      <MbtiContainer>
        <Heading text={mbti} fontSize="15px" highlighted />
        <Heading
          text={MBTI_RESULT[mbti].shareDesc}
          fontSize="13px"
          textAlign="center"
        />
        <Image src={mbtiImagePath} alt={mbti} width={150} height={150} />
      </MbtiContainer>
    </Container>
  );
}

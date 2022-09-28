import React from 'react';
import Button from '../atom/Button';
import Heading from '../atom/Heading';
import styled from '@emotion/styled';
import RangeBar from '../atom/RangeBar';
import RangeNum from '../atom/RangeNum';

const Container = styled.div`
  width: 80%;
  min-width: 100%;
  height: 70vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.5fr auto 1fr;
  @media (min-height: 700px) {
    height: 700px;
  }
  @media (min-width: 571px) {
    width: 571px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin: 50px auto;
`;

const RangeContainer = styled.div`
  height: 100%;
  display: grid;
  align-content: start;
`;

export default function SurveyTemplate({
  survey,
  surveyNum,
  pageChange,
  onChangeMbti,
  handleSendLog,
}) {
  return (
    <Container>
      <Heading text={`Q${surveyNum + 1}`} highlighted></Heading>
      <Heading text={survey.question}></Heading>
      <ButtonContainer>
        <Button
          text={survey.answer1.answer}
          onClick={() => {
            pageChange();
            onChangeMbti(survey.answer1.MBTI);
            handleSendLog(survey.answer1.MBTI);
          }}
        ></Button>
        <Button
          text={survey.answer2.answer}
          onClick={() => {
            pageChange();
            onChangeMbti(survey.answer2.MBTI);
            handleSendLog(survey.answer2.MBTI);
          }}
        ></Button>
      </ButtonContainer>
      <RangeContainer>
        <RangeBar surveyNum={surveyNum}></RangeBar>
        <RangeNum surveyNum={surveyNum}></RangeNum>
      </RangeContainer>
    </Container>
  );
}

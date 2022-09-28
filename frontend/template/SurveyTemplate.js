import React from 'react';
import Button from '../atom/Button';
import Heading from '../atom/Heading';
import styled from '@emotion/styled';
import RangeBar from '../atom/RangeBar';
import RangeNum from '../atom/RangeNum';

const Container = styled.div`
  width: 80%;
  min-width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  grid-template-rows: 3fr 5fr 2fr;
  grid-template-columns: 1fr;
=======
  grid-template-rows: 3fr 40vh 2fr;
>>>>>>> 25c91f4 (feat: survey button css 수정)
  box-sizing: border-box;
  @media (min-height: 700px) {
    height: 630px;
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
  align-items: center;
  box-sizing: border-box;
  & > button {
    margin-top: 20px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
`;

const RangeContainer = styled.div`
  box-sizing: border-box;
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
      <TextContainer>
        <Heading text={'Q' + (surveyNum + 1)} highlighted></Heading>
        <Heading text={survey.question}></Heading>
      </TextContainer>
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

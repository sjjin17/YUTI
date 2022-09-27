import React, { useState, useEffect, useCallback } from 'react';
import SurveyTemplate from '../template/SurveyTemplate';
import styled from '@emotion/styled';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const surveyList = [
  {
    question: '(혼자 걷다가)우연히 좋아하는 유튜버를 마주치면',
    answer1: {
      answer: '사진을 찍어달라고 부탁 후 친구들에게 자랑한다.',
      MBTI: 'E',
    },
    answer2: {
      answer: '반갑지만 차마 다가가서 말을 걸지는 않는다.',
      MBTI: 'I',
    },
  },
  {
    question: '정말 가고 싶었던 해외 여행지를 여행하는 유튜버 모습을 보고',
    answer1: {
      answer: '“오~ 재밌겠네”하고 만다.',
      MBTI: 'S',
    },
    answer2: {
      answer: '그 여행지에서 놀고 있는 모습을 종종 상상하곤 한다.',
      MBTI: 'N',
    },
  },
  {
    question: '유튜버가 어울리지 않는 옷을 살지 말지 투표를 올렸다.',
    answer1: {
      answer: '단호하게 어울리지 않는다고 응답한다.',
      MBTI: 'T',
    },
    answer2: {
      answer: '마음이 상할까봐 예쁘지만 다른 옷도 보고싶다고 응답한다.',
      MBTI: 'F',
    },
  },

  {
    question:
      '내일이 시험인데, 유튜브 영상을 보다보니 쉬기로 한 시간보다 많이 지났다.',
    answer1: {
      answer: '지금부터 안쉬며 열심히 해야지라고 마음을 먹는다.',
      MBTI: 'P',
    },
    answer2: {
      answer: '남은 시간동안 공부할 계획을 다시 세운다. ',
      MBTI: 'J',
    },
  },
  {
    question: '약속이 없는 주말에 유튜브 등 OTT에 볼 영상이 너무 없다',
    answer1: {
      answer: '먼저 친구에게 만나자고 한다',
      MBTI: 'E',
    },
    answer2: {
      answer: '집에서 할 수 있는 다른 일을 찾아본다.',
      MBTI: 'I',
    },
  },
  {
    question: '재미있게 본 영화의 참신한 해석 영상을 유튜브에서 봤다.',
    answer1: {
      answer: '저렇게 생각할 수 있구나 하고 생각한다.',
      MBTI: 'S',
    },
    answer2: {
      answer: '가끔 자기 전에 해석이 생각나곤 한다.',
      MBTI: 'N',
    },
  },
  {
    question:
      '“요즘 회사 때려치고 싶어,,유튜브나 할까?”라고 말하는 친구에게 먼저 꺼낼 것 같은 말은?',
    answer1: {
      answer: '갑자기 유튜브는 왜?',
      MBTI: 'T',
    },
    answer2: {
      answer: '회사 일 많이 힘들어..? ',
      MBTI: 'F',
    },
  },
  {
    question: '드디어 오늘 유튜브를 시작하기로 했다.',
    answer1: {
      answer:
        '처음이라 발생할 수 있는 다양한 경우의 수를 미리 생각하고 계획한다. ',
      MBTI: 'J',
    },
    answer2: {
      answer:
        '계획은 콘텐츠 하나로 충분하다! 발생하는 경우의 수는 그 때의 내가 잘 해결 할 거다.',
      MBTI: 'P',
    },
  },
  {
    question: '유튜버 10만 구독자 행사에 참여하게 되었다.',
    answer1: {
      answer:
        '가능한 같은 테이블에 앉은 사람이 먼저 말 걸어올 때까지 기다린다.',
      MBTI: 'I',
    },
    answer2: {
      answer: '먼저 말 걸면서 이야기를 시작해본다.',
      MBTI: 'E',
    },
  },
  {
    question: '유튜브에서 재밌게 본 드라마 영상을 연인에게 소개할 때 나는',
    answer1: {
      answer:
        '바이러스가 퍼져서 폐허가 된 도시를 배경으로 백신을 구하는 이야기야',
      MBTI: 'S',
    },
    answer2: {
      answer:
        '주인공이 바이러스로 폐허가 된 도시에서도 사랑하는 연인과 살아남는 스토리야',
      MBTI: 'N',
    },
  },
  {
    question:
      '천명 구독자 달성으로 수익 창출할 수 있게 돼서 친구에게 자랑을 했다. 칭찬을 받을 때 더 기분 좋은 말은?',
    answer1: {
      answer: '진짜 열심히 했나보다!! 멋지다~!',
      MBTI: 'F',
    },
    answer2: {
      answer: '영상 보니깐 좋은데 이런 부분만 수정하면 더 잘될 거 같아!',
      MBTI: 'T',
    },
  },
  {
    question: '친구들과 여행을 가기로 했다.',
    answer1: {
      answer: '시간 단위 혹은 분단위별로 계획을 짠다.',
      MBTI: 'J',
    },
    answer2: {
      answer: '대략적인 코스만 짠다. 그조차도 안지키는 경우도 있다.',
      MBTI: 'P',
    },
  },
];

const mbtiArray = [
  ['E', 'I'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
];

export default function Survey() {
  const [resultMbti, setResultMbti] = useState([0, 0, 0, 0]);
  const [surveyNum, setSurveyNum] = useState(0);

  useEffect(() => {
    if (surveyNum < surveyList.length) return;
    saveMbti();
    Router.push({
      pathname: '/search',
    });
  }, [surveyNum, saveMbti]);

  const saveMbti = useCallback(() => {
    const MBTI = resultMbti.reduce((prev, cur, idx) => {
      return (prev += cur > 0 ? mbtiArray[idx][0] : mbtiArray[idx][1]);
    }, '');
    window.localStorage.setItem('mbti', MBTI);
  }, []);

  const pageChange = () => {
    setSurveyNum(prev => prev + 1);
  };

  const mbtiChange = questionMbti => {
    const flatMbti = mbtiArray.flat();
    const idx = flatMbti.indexOf(questionMbti);
    const row = parseInt(idx / 2);
    const col = parseInt(idx % 2);

    setResultMbti(prev => {
      const arr = [...prev];
      arr[row] += col === 0 ? 1 : -1;
      return arr;
    });
  };

  return (
    <>
      {surveyNum < surveyList.length && (
        <Container>
          <SurveyTemplate
            survey={surveyList[surveyNum]}
            surveyNum={surveyNum}
            pageChange={pageChange}
            onChangeMbti={mbtiChange}
          ></SurveyTemplate>
        </Container>
      )}
    </>
  );
}

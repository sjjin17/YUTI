import { useEffect, useState } from 'react';
import ResultTemplate from '../template/ResultTemplate';

// dummyData
const mbti = 'ENFP';
const resultYoutubers = [
  {
    imageUrl:
      'https://yt3.ggpht.com/ytc/AMLnZu-8RH15z7SK6uCXKe5ysc99eDuXKwvseJCwpmkSEg=s88-c-k-c0x00ffffff-no-rj',
    youtuberName: '해쭈',
  },
  {
    imageUrl:
      'https://yt3.ggpht.com/ytc/AMLnZu88fElvXTdbMhtfvYjqbMGb3ULvOF_jPcBM_LPhIA=s176-c-k-c0x00ffffff-no-rj-mo',
    youtuberName: '랄로',
  },
  {
    imageUrl:
      'https://yt3.ggpht.com/ytc/AMLnZu_k_amXQkaFEVP59pDt1tXg9Nlol0TXmiS5j7qwHg=s176-c-k-c0x00ffffff-no-rj-mo',
    youtuberName: '우주하마',
  },
];
const INDEX_URL = 'https://j7a502.p.ssafy.io/';

const MBTI_TEXT = {
  ENFP: (
    <>
      시끌벅적한 영상을 즐기는 <strong>프로 덕질러</strong>
    </>
  ),
  INFP: '인프피 관련 영상을 즐겨보는 나르시시스트',
  ENFJ: '시민의식 깨우는 영상을 즐기는 희열러',
  INFJ: '미정',
  ENTJ: '유튜브에서도 자기계발 영상 보는 갓생러',
  INTJ: '심오하면서 이론적인 영상을 즐기는 탐구러',
  ENTP: '지루한 건 절대 싫어! 웃긴 영상 찾아다니는 웃음 사냥꾼',
  INTP: '웃긴 밈 뇌절할 때까지 찾아보는 과몰입러',
  ESFP: '미정',
  ISFP: '실제 사건 다루는 영상을 즐겨보는 호기심러',
  ESTP: '미정',
  ISFP: '이어폰 필수인 ASMR 중독자',
  ESFJ: '미정',
  ISFJ: '노래 모음, 드라마 하이라이트 보는 요약러',
  ESTJ: '검색은 유튜브로! 프로 검색러',
  ISTJ: '미정',
};

export default function Result() {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const [mbtiResult, setMbtiResult] = useState({
    desc: '',
    likeYoutubers: [],
  });

  useEffect(() => {
    setMbtiResult({
      likeYoutubers: resultYoutubers,
      desc: MBTI_TEXT[mbti],
    });
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(INDEX_URL);
  };

  const handleKakaoShare = () => {
    window.Kakao.Share.createCustomButton({
      container: '#kakaotalk-sharing-btn',
      templateId: 82753,
    });
  };

  return (
    <>
      <ResultTemplate
        mbti={mbti}
        mbtiResult={mbtiResult}
        url={INDEX_URL}
        handleCopyUrl={handleCopyUrl}
        handleKakaoShare={handleKakaoShare}
      />
    </>
  );
}

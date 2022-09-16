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

export default function result() {
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

  const resultText = mbti => {
    let text = '';
    switch (mbti) {
      case 'ENFP':
        text = (
          <>
            시끌벅적한 영상을 즐기는 <strong>프로 덕질러</strong>
          </>
        );
        break;
      case 'INFP':
        text = '인프피 관련 영상을 즐겨보는 나르시시스트';
        break;
      case 'ENFJ ':
        text = '시민의식 깨우는 영상을 즐기는 희열러';
        break;
      case 'INFJ ':
        text = '미정';
        break;
      case 'ENTJ':
        text = '유튜브에서도 자기계발 영상 보는 갓생러';
        break;
      case 'INTJ':
        text = '심오하면서 이론적인 영상을 즐기는 탐구러';
        break;
      case 'ENTP':
        text = '지루한 건 절대 싫어! 웃긴 영상 찾아다니는 웃음 사냥꾼';
        break;
      case 'INTP':
        text = '웃긴 밈 뇌절할 때까지 찾아보는 과몰입러';
        break;
      case 'ESFP':
        text = '미정';
        break;
      case 'ISFP':
        text = '실제 사건 다루는 영상을 즐겨보는 호기심러';
        break;
      case 'ESTP':
        text = '미정';
        break;
      case 'ISFP':
        text = '이어폰 필수인 ASMR 중독자';
        break;
      case 'ESFJ':
        text = '미정';
        break;
      case 'ISFJ':
        text = '노래 모음, 드라마 하이라이트 보는 요약러';
        break;
      case 'ESTJ':
        text = '검색은 유튜브로! 프로 검색러';
        break;
      case 'ISTJ':
        text = '미정';
        break;
    }
    return text;
  };

  useEffect(() => {
    setMbtiResult({
      likeYoutubers: resultYoutubers,
      desc: resultText(mbti),
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

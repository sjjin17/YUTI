import { useEffect } from 'react';
import ResultTemplate from '../template/ResultTemplate';

export default function result() {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleKakaoShare = () => {
    window.Kakao.Share.createCustomButton({
      container: '#kakaotalk-sharing-btn',
      templateId: 82753,
    });
  };

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

  const resultText = mbti => {
    let result = '';
    switch (mbti) {
      case 'ENFP':
        result = '시끌벅적한 영상을 즐기는 프로 덕질러';
        break;
      case 'INFP':
        result = '인프피 관련 영상을 즐겨보는 나르시시스트';
        break;
      case 'ENFJ ':
        result = '시민의식 깨우는 영상을 즐기는 희열러';
        break;
      case 'INFJ ':
        result = '미정';
        break;
      case 'ENTJ':
        result = '유튜브에서도 자기계발 영상 보는 갓생러';
        break;
      case 'INTJ':
        result = '심오하면서 이론적인 영상을 즐기는 탐구러';
        break;
      case 'ENTP':
        result = '지루한 건 절대 싫어! 웃긴 영상 찾아다니는 웃음 사냥꾼';
        break;
      case 'INTP':
        result = '웃긴 밈 뇌절할 때까지 찾아보는 과몰입러';
        break;
      case 'ESFP':
        result = '미정';
        break;
      case 'ISFP':
        result = '실제 사건 다루는 영상을 즐겨보는 호기심러';
        break;
      case 'ESTP':
        result = '미정';
        break;
      case 'ISFP':
        result = '이어폰 필수인 ASMR 중독자';
        break;
      case 'ESFJ':
        result = '미정';
        break;
      case 'ISFJ':
        result = '노래 모음, 드라마 하이라이트 보는 요약러';
        break;
      case 'ESTJ':
        result = '검색은 유튜브로! 프로 검색러';
        break;
      case 'ISTJ':
        result = '미정';
        break;
    }
    return result;
  };

  const INDEX_URL = 'https://j7a502.p.ssafy.io/';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(INDEX_URL);
  };

  return (
    <>
      <ResultTemplate
        mbti={mbti}
        resultText={resultText(mbti)}
        resultYoutubers={resultYoutubers}
        url={INDEX_URL}
        handleCopyUrl={handleCopyUrl}
        handleKakaoShare={handleKakaoShare}
      />
    </>
  );
}

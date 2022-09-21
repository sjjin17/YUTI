import React, { useEffect, useState } from 'react';
import ResultTemplate from '../template/ResultTemplate';

// dummyData
const mbti = 'INFP';
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

const MBTI_RESULT = {
  ENFP: {
    desc: (
      <>
        대화에서 뒤쳐질 수 없어서, <br />
        유명한 유튜버는 전부 파악중인
        <strong> 핵인싸</strong>
      </>
    ),
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 2,
      인싸력: 5,
    },
  },
  INFP: {
    desc: (
      <>
        인프피 관련 영상을 즐겨보는 <br /> <strong>프로 공감러</strong>
      </>
    ),
    gageInfos: {
      정보: 1,
      재미: 3,
      대리만족: 4,
      공감력: 5,
    },
  },
  ENFJ: {
    desc: (
      <>
        시민의식 깨우는 영상을 즐기는 <strong>희열러</strong>
      </>
    ),
    gageInfos: {
      정보: 2,
      재미: 2,
      대리만족: 5,
      사명감: 5,
    },
  },
  INFJ: {
    desc: (
      <>
        감성에 죽고 감성에 산다, <strong>감죽감살</strong>
      </>
    ),
    gageInfos: {
      정보: 3,
      재미: 3,
      대리만족: 4,
      감성: 5,
    },
  },
  ENTJ: {
    desc: (
      <>
        유튜브에서도 자기계발 영상 보는 <strong>갓생러</strong>
      </>
    ),
    gageInfos: {
      정보: 4,
      재미: 1,
      대리만족: 3,
      열정: 5,
    },
  },
  INTJ: {
    desc: (
      <>
        세상 모든 정보 다 습득하고 싶어하는 <br /> <strong>알쓸신잡러</strong>
      </>
    ),
    gageInfos: {
      정보: 5,
      재미: 2,
      대리만족: 2,
      호기심: 5,
    },
  },
  ENTP: {
    desc: (
      <>
        너넨 ○○ 모르지? 확고한 취향의 <br /> <strong>자발적 아웃사이더</strong>
      </>
    ),
    gageInfos: {
      정보: 2,
      재미: 3,
      대리만족: 1,
      홍대병: 5,
    },
  },
  INTP: {
    desc: (
      <>
        호기심은 많지만 짧은 영상을 즐겨보는 <br /> <strong>쇼츠 중독자</strong>
      </>
    ),
    gageInfos: {
      정보: 4,
      재미: 1,
      대리만족: 1,
      속도감: 5,
    },
  },
  ESFP: {
    desc: (
      <>
        모든 영상과 친하게 지내는 <strong>사교러</strong>
      </>
    ),
    gageInfos: {
      정보: 4,
      재미: 4,
      대리만족: 1,
      친화력: 5,
    },
  },
  ISFP: {
    desc: (
      <>
        트랜드에 민감한 유튜브계의 <strong>얼리어답터</strong>
      </>
    ),
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 1,
      트렌디: 5,
    },
  },
  ESTP: {
    desc: (
      <>
        가만히는 못있는 <strong>오감 만족러</strong>
      </>
    ),
    gageInfos: {
      정보: 1,
      재미: 4,
      대리만족: 2,
      관종력: 5,
    },
  },
  ISTP: {
    desc: (
      <>
        유튜브로 세상을 탐색하는 <strong>프로 탐구러</strong>
      </>
    ),
    gageInfos: {
      정보: 2,
      재미: 4,
      대리만족: 2,
      관찰력: 5,
    },
  },
  ESFJ: {
    desc: (
      <>
        재미없는 건 쳐다보지도 않는 <br /> <strong>분위기 메이커</strong>
      </>
    ),
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 2,
      진행력: 5,
    },
  },
  ISFJ: {
    desc: (
      <>
        어디든 갈 수 있어! <strong>방구석 여행러</strong>
      </>
    ),
    gageInfos: {
      정보: 2,
      재미: 3,
      대리만족: 5,
      몰입력: 5,
    },
  },
  ESTJ: {
    desc: (
      <>
        검색은 유튜브로! <strong>프로 검색러</strong>
      </>
    ),
    gageInfos: {
      정보: 5,
      재미: 2,
      대리만족: 1,
      생활력: 5,
    },
  },
  ISTJ: {
    desc: (
      <>
        팩트 없이 못사는 <strong>팩트 체크러</strong>
      </>
    ),
    gageInfos: {
      정보: 4,
      재미: 3,
      대리만족: 2,
      현실주의: 5,
    },
  },
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
    gageInfos: {},
    likeYoutubers: [],
  });

  useEffect(() => {
    setMbtiResult({
      likeYoutubers: resultYoutubers,
      desc: MBTI_RESULT[mbti].desc,
      gageInfos: MBTI_RESULT[mbti].gageInfos,
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

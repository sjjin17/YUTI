import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ResultTemplate from '../template/ResultTemplate';
import axios from '../utils/secondAxios';

const INDEX_URL = 'https://j7a502.p.ssafy.io/';

export const MBTI_RESULT = {
  ENFP: {
    desc: (
      <>
        대화에서 뒤쳐질 수 없어서, <br />
        유명한 유튜버는 전부 파악중인
        <strong> 핵인싸</strong>
      </>
    ),
    shareDesc: '대화에서 뒤쳐질 수 없어서, 유명 유튜버는 전부 파악중인 핵인싸',
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 2,
      인싸력: 5,
    },
    otherMbti: ['ENTP', 'ISTJ'],
  },
  INFP: {
    desc: (
      <>
        인프피 관련 영상을 즐겨보는 <br /> <strong>프로 공감러</strong>
      </>
    ),
    shareDesc: '인프피 관련 영상을 즐겨보는 프로 공감러',
    gageInfos: {
      정보: 1,
      재미: 3,
      대리만족: 4,
      공감력: 5,
    },
    otherMbti: ['ENFP', 'ESTJ'],
  },
  ENFJ: {
    desc: (
      <>
        시민의식 깨우는 영상을 즐기는 <strong>희열러</strong>
      </>
    ),
    shareDesc: '시민의식 깨우는 영상을 즐기는 희열러',
    gageInfos: {
      정보: 2,
      재미: 2,
      대리만족: 5,
      사명감: 5,
    },
    otherMbti: ['INFJ', 'ISTJ'],
  },
  INFJ: {
    desc: (
      <>
        감성에 죽고 감성에 산다, <strong>감죽감살</strong>
      </>
    ),
    shareDesc: '감성에 죽고 감성에 산다, 감죽감살',
    gageInfos: {
      정보: 3,
      재미: 3,
      대리만족: 4,
      감성: 5,
    },
    otherMbti: ['ISFJ', 'ESTP'],
  },
  ENTJ: {
    desc: (
      <>
        유튜브에서도 자기계발 영상 보는 <strong>갓생러</strong>
      </>
    ),
    shareDesc: '유튜브에서도 자기계발 영상 보는 갓생러 ',
    gageInfos: {
      정보: 4,
      재미: 1,
      대리만족: 3,
      열정: 5,
    },
    otherMbti: ['ENTP', 'ISFP'],
  },
  INTJ: {
    desc: (
      <>
        세상 모든 정보 다 습득하고 싶어하는 <br /> <strong>알쓸신잡러</strong>
      </>
    ),
    shareDesc: '세상 모든 정보 다 습득하고 싶어하는 알쓸신잡러',
    gageInfos: {
      정보: 5,
      재미: 2,
      대리만족: 2,
      호기심: 5,
    },
    otherMbti: ['INTP', 'ESFP'],
  },
  ENTP: {
    desc: (
      <>
        너넨 ○○ 모르지? 확고한 취향의 <br /> <strong>자발적 아웃사이더</strong>
      </>
    ),
    shareDesc: '너넨 ○○모르지? 확고한 취향의 자발적 아웃사이더',
    gageInfos: {
      정보: 2,
      재미: 3,
      대리만족: 1,
      홍대병: 5,
    },
    otherMbti: ['ENTJ', 'ISFJ'],
  },
  INTP: {
    desc: (
      <>
        호기심은 많지만 짧은 영상을 즐겨보는 <br /> <strong>쇼츠 중독자</strong>
      </>
    ),
    shareDesc: '호기심은 많지만 짧은 영상을 즐겨보는 쇼츠 중독자',
    gageInfos: {
      정보: 4,
      재미: 1,
      대리만족: 1,
      속도감: 5,
    },
    otherMbti: ['ENTP', 'ESFJ'],
  },
  ESFP: {
    desc: (
      <>
        모든 영상과 친하게 지내는 <strong>사교러</strong>
      </>
    ),
    shareDesc: '모든 영상과 친하게 지내는 사교러',
    gageInfos: {
      정보: 4,
      재미: 4,
      대리만족: 1,
      친화력: 5,
    },
    otherMbti: ['ISFJ', 'INTJ'],
  },
  ISFP: {
    desc: (
      <>
        트랜드에 민감한 유튜브계의 <strong>얼리어답터</strong>
      </>
    ),
    shareDesc: '트랜드에 민감한 유튜브계의 얼리어답터',
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 1,
      트렌디: 5,
    },
    otherMbti: ['ESFJ', 'ENTJ'],
  },
  ESTP: {
    desc: (
      <>
        가만히는 못있는 <strong>오감 만족러</strong>
      </>
    ),
    shareDesc: '가만히는 못있는 오감 만족러',
    gageInfos: {
      정보: 1,
      재미: 4,
      대리만족: 2,
      관종력: 5,
    },
    otherMbti: ['ISTP', 'INFP'],
  },
  ISTP: {
    desc: (
      <>
        유튜브로 세상을 탐색하는 <strong>프로 탐구러</strong>
      </>
    ),
    shareDesc: '유튜브로 세상을 탐색하는 프로 탐구러',
    gageInfos: {
      정보: 2,
      재미: 4,
      대리만족: 2,
      관찰력: 5,
    },
    otherMbti: ['ESTP', 'INTP'],
  },
  ESFJ: {
    desc: (
      <>
        재미없는 건 쳐다보지도 않는 <br /> <strong>분위기 메이커</strong>
      </>
    ),
    shareDesc: '재미없는 건 쳐다보지도 않는 분위기 메이커',
    gageInfos: {
      정보: 1,
      재미: 5,
      대리만족: 2,
      진행력: 5,
    },
    otherMbti: ['ESFP', 'INTP'],
  },
  ISFJ: {
    desc: (
      <>
        어디든 갈 수 있어! <strong>방구석 여행러</strong>
      </>
    ),
    shareDesc: '어디든 갈 수 있어! 방구석 여행러',
    gageInfos: {
      정보: 2,
      재미: 3,
      대리만족: 5,
      몰입력: 5,
    },
    otherMbti: ['INFJ', 'ENTP'],
  },
  ESTJ: {
    desc: (
      <>
        검색은 유튜브로! <strong>프로 검색러</strong>
      </>
    ),
    shareDesc: '검색은 유튜브로! 프로 검색러',
    gageInfos: {
      정보: 5,
      재미: 2,
      대리만족: 1,
      생활력: 5,
    },
    otherMbti: ['ENTJ', 'INFP'],
  },
  ISTJ: {
    desc: (
      <>
        팩트 없이 못사는 <strong>팩트 체크러</strong>
      </>
    ),
    shareDesc: '팩트 없이 못사는 팩트 체크러',
    gageInfos: {
      정보: 4,
      재미: 3,
      대리만족: 2,
      현실주의: 5,
    },
    otherMbti: ['ISFJ', 'INFJ'],
  },
};

export default function Result({ likeYoutubers }) {
  const router = useRouter();
  const { mbti } = router.query;
  const resultUrl = INDEX_URL + mbti;
  const [mbtiResult, setMbtiResult] = useState({
    desc: '',
    gageInfos: {},
    likeYoutubers: likeYoutubers,
    otherMbti: [],
  });

  useEffect(() => {
    setMbtiResult({
      ...mbtiResult,
      desc: MBTI_RESULT[mbti].desc,
      gageInfos: MBTI_RESULT[mbti].gageInfos,
      otherMbti: MBTI_RESULT[mbti].otherMbti,
    });
  }, [mbti]);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
      window.Kakao.Share.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 82753,
        templateArgs: {
          mbti_desc: `${MBTI_RESULT[mbti].shareDesc}`,
          mbti_image: `https://j7a502.p.ssafy.io/_next/image?url=%2Fimages%2F${mbti}.png&w=640&q=75`,
          mbti: `${mbti}`,
          likeYoutubers_first: `${mbtiResult.likeYoutubers[0].channelName}`,
          likeYoutubers_second: `${mbtiResult.likeYoutubers[1].channelName}`,
          likeYoutubers_third: `${mbtiResult.likeYoutubers[2].channelName}`,
        },
      });
    }
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(resultUrl);
  };

  const handleNaviMainPage = () => {
    router.replace('/');
  };

  const handleNaviOtherMbitPage = mbti => {
    router.replace(`${mbti}`);
  };

  return (
    <>
      <ResultTemplate
        mbti={mbti}
        mbtiResult={mbtiResult}
        url={resultUrl}
        handleCopyUrl={handleCopyUrl}
        handleNaviMainPage={handleNaviMainPage}
        handleNaviOtherMbitPage={handleNaviOtherMbitPage}
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`/api/v1/mbti/${params.mbti}`);
    const likeYoutubers = await response.data.data;
    return { props: { likeYoutubers } };
  } catch (error) {
    if (error.response?.status === 500) {
      return {
        redirect: {
          destination: '/500',
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
}

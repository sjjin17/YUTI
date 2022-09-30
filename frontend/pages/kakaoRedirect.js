import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from '../utils/axios';

export default function KakaoRedirect() {
  const router = useRouter();
  const redirectURL = router.query.url;

  const kakaoShareMain = () => {
    axios({
      method: 'POST',
      url: '/log/share-main',
      data: {},
    });
  };

  const kakaoShareResult = mbti => {
    axios({
      method: 'POST',
      url: `/log/share-result/${mbti}`,
      data: {},
    });
  };

  useEffect(() => {
    if (redirectURL === 'main') {
      router.replace('/');
      kakaoShareMain();
    } else if (redirectURL === 'result') {
      const mbti = router.query.mbti;
      router.replace(mbti);
      kakaoShareResult(mbti);
    }
  }, [redirectURL]);

  return <></>;
}

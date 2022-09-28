import Router, { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { sendLog } from '../utils/log';
const RouteContext = createContext(null);

export const RouteChangeProvider = ({ children }) => {
  const [surveyNum, setSurveyNum] = useState(0);
  const { pathname, events } = useRouter();

  const pageNumber = useMemo(() => {
    const pageNumbers = { '/': 0, '/survey': surveyNum + 1, '/search': 14 };
    return pageNumbers[pathname];
  }, [surveyNum, pathname]);

  const handleRouteChange = useCallback(() => {
    sendLog(pageNumber);
  }, [pathname]);

  const handleRouteChangeStart = useCallback(
    url => {
      let isNextPage = false;
      const MBTI = localStorage.getItem('mbti');

      switch (pathname) {
        case '/':
          if (url === '/survey') {
            isNextPage = true;
          }
          break;
        case '/survey':
          if (url === '/search') {
            isNextPage = true;
          }
          break;
        case '/search':
          if (url === `/${MBTI}`) {
            isNextPage = true;
          }
          break;
        case '/[mbti]':
          if (url === '/') {
            isNextPage = true;
          }
          break;
      }
      if (!isNextPage) {
        sendLog(pageNumber);
        if (url !== '/') Router.push({ pathname: '/' });
      }
    },
    [pathname],
  );

  useEffect(() => {
    // 이벤트 리스너
    window.addEventListener('beforeunload', handleRouteChange);
    events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
      events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [events, handleRouteChange, handleRouteChangeStart]);

  return (
    <RouteContext.Provider value={{ surveyNum, setSurveyNum, pageNumber }}>
      {children}
    </RouteContext.Provider>
  );
};

export function useRouteContext() {
  return useContext(RouteContext);
}

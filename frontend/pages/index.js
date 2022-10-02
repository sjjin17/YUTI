import { useTheme } from '@emotion/react';
import React, { useEffect } from 'react';
import { useRouteContext } from '../context/RouteChangeContext';
import IndexTemplate from '../template/IndexTemplate';
import { sendTimeLog } from '../utils/log';
import axios from '../utils/secondAxios';
import Head from 'next/head';

export default function Home({ participantsNum }) {
  const { setSurveyNum, pageNumber } = useRouteContext();
  const theme = useTheme();
  useEffect(() => {
    setSurveyNum(0);
  }, []);

  const handleSendLog = () => {
    sendTimeLog({
      pageNo: pageNumber,
      color: theme.colors.main === '#67D193' ? 'green' : 'red',
      answer: '',
      diffTime: new Date(),
    });
  };

  return (
    <>
      <Head>
        <title>YUTI</title>
      </Head>
      <IndexTemplate
        participantsNum={participantsNum}
        handleSendLog={handleSendLog}
      ></IndexTemplate>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('/api/v1/mbti');
    return {
      props: { participantsNum: res.data.data },
    };
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

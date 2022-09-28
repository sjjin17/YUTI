import { useTheme } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouteContext } from '../context/RouteChangeContext';
import IndexTemplate from '../template/IndexTemplate';
import { sendTimeLog } from '../utils/log';
import axios from '../utils/secondAxios';

export default function Home() {
  const [participantsNum, setParticipantsNum] = useState(0);
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

  useEffect(() => {
    getParticipantsNum();
  }, [getParticipantsNum]);

  const getParticipantsNum = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/mbti');
      setParticipantsNum(res.data.data);
    } catch (e) {}
  }, []);

  return (
    <IndexTemplate
      participantsNum={participantsNum}
      handleSendLog={handleSendLog}
    ></IndexTemplate>
  );
}

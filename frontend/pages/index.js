import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useRouteContext } from '../context/RouteChangeContext';
import IndexTemplate from '../template/IndexTemplate';
import { sendTimeLog } from '../utils/log';

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

  return (
    <IndexTemplate
      participantsNum={participantsNum}
      handleSendLog={handleSendLog}
    ></IndexTemplate>
  );
}

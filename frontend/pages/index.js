import React, { useState } from 'react';
import IndexTemplate from '../template/IntdexTemplate';

export default function Home() {
  const [participantsNum, setParticipantsNum] = useState(0);
  return <IndexTemplate participantsNum={participantsNum}></IndexTemplate>;
}

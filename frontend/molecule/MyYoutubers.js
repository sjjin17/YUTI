import styled from '@emotion/styled';
import SelectedYtb from './SelectedYtb';

const YoutuberContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 5% auto;
`;

export default function MyYoutubers({ selectedList, delSelected }) {
  return (
    <YoutuberContainer>
      {selectedList.map((youtuber, idx) => (
        <SelectedYtb
          key={idx}
          youtuber={youtuber}
          delSelected={delSelected}
        ></SelectedYtb>
      ))}
    </YoutuberContainer>
  );
}
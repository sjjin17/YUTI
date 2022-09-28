import styled from '@emotion/styled';
import SelectedYtb from './SelectedYtb';

const YoutuberContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  margin: 5% 0;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: block;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0, 0.1);
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end{
    background: transparent
    margin-bottom: 10px;
  }
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

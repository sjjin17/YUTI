import styled from '@emotion/styled';
import SelectedYtb from './SelectedYtb';

const YoutuberContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 5% auto;
`;

export default function MyYoutubers({ selectedList }) {
  return (
    <YoutuberContainer>
      {selectedList.map((thumbnail, idx) => (
        <SelectedYtb key={idx} imageUrl={thumbnail}></SelectedYtb>
      ))}
    </YoutuberContainer>
  );
}

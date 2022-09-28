import styled from '@emotion/styled';

const DelImage = styled.img`
  width: 15px;
  position: absolute;
  z-index: 1;
  top: -0.3px;
  right: -0.5px;
  cursor: pointer;
  }
`;

export default function BtnDel({ youtuber, delSelected }) {
  const dellImagePath = `/images/Btndel.png`;

  return (
    <DelImage
      src={dellImagePath}
      alt="delBtn"
      onClick={() => delSelected(youtuber)}
    />
  );
}

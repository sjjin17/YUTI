import styled from '@emotion/styled';

const DelImage = styled.img`
  width: 13px;
  position: absolute;
  z-index: 1;
  top: -10px;
  right: 4px;
  cursor: pointer;
  }
`;

export default function BtnDel({ youtuber, delSelected }) {
  const dellImagePath = `images/Btndel.png`;

  return (
    <DelImage
      src={dellImagePath}
      alt="delBtn"
      onClick={() => delSelected(youtuber)}
    />
  );
}

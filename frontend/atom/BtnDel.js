import styled from '@emotion/styled';

const DelImage = styled.img`
  width: 13px;
  position: absolute;
  z-index: 1;
  top: -10px;
  }
`;

export default function BtnDel({ youtuber, editSelected }) {
  const dellImagePath = `images/Btndel.png`;

  return (
    <DelImage
      src={dellImagePath}
      alt="delBtn"
      onClick={e => editSelected(youtuber)}
    />
  );
}

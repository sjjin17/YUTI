import styled from '@emotion/styled';

const UrlShareBtn = styled.button`
  width: 45px;
  height: 45px;
  color: white;
  border-radius: 24px;
  border: none;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  background-color: black;
`;

export default function UrlShare({ onClick }) {
  return (
    <>
      <UrlShareBtn onClick={onClick}>URL</UrlShareBtn>
    </>
  );
}

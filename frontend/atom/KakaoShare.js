import styled from '@emotion/styled';

const KakaoBtn = styled.img`
  border-radius: 24px;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

export default function KakaoShare() {
  return (
    <KakaoBtn
      id="kakaotalk-sharing-btn"
      onClick={onClick}
      src="images/kakaoLogo.png"
      alt="kakaoLogo"
    />
  );
}

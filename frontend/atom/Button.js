import React from 'react';
import styled from '@emotion/styled';
import { sendTimeLog } from '../utils/log';
import { useRouteContext } from '../context/RouteChangeContext';
import { useTheme } from '@emotion/react';

const ButtonBase = styled.button`
  background: white;
  color: black;
  border-radius: 10px;
  border-color: rgb(0, 0, 0, 0.2);
  height: 15vh;
  box-sizing: border-box;
  white-space: pre-line;
  &:hover {
    background: ${props => props.theme.colors.main};
    border: 0 solid;
    color: white;
    cursor: pointer;
  }

  @media (min-height: 700px) {
    height: 105px;
  }

  @media (max-width: 571px) {
    font-size: 4vw;
  }
  @media (min-width: 571px) {
    font-size: 22px;
  }
`;

const Button = React.forwardRef(({ onClick, href, text }, ref) => {
  return (
    <ButtonBase href={href} onClick={onClick} ref={ref}>
      {text}
    </ButtonBase>
  );
});

Button.displayName = 'MyButton';

export default Button;

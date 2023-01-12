import styled, { css, keyframes } from 'styled-components';
import { ThemeWrapperType } from '..';

const rotateAnimation = keyframes`
0% {
  transform: rotateZ(0deg);
}

100% {
  transform: rotateZ(360deg);
}
`;

const StyledButton = styled.button.attrs((props) => ({ outlined: true }))`
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &: hover {
    animation: ${rotateAnimation} 1s infinite linear;
  }
  align-self: ${({ align }: ButtonProps) => align || 'stretch'};

  ${(props) =>
    props.primary &&
    css`
      color: ${({ color, theme }: ButtonProps & ThemeWrapperType) =>
        color || theme.colors.primary};
      background: ${({ background, theme }: ButtonProps & ThemeWrapperType) =>
        background || theme.colors.primary};
    `}

  ${(props) =>
    props.outlined &&
    css`
      color: ${({ color, theme }: ButtonProps & ThemeWrapperType) =>
        color || theme.colors.primary};
      background: transparent;
      border: 1px solid
        ${({ color, theme }: ButtonProps & ThemeWrapperType) =>
          color || theme.colors.primary};
    `}
`;

const LargeButton = styled(StyledButton)`
  font-size: 32px;
`;

type ButtonProps = {
  children: React.ReactNode;
  color?: string;
  background?: string;
  align?: string;
  primary?: boolean;
  outlined?: boolean;
};

function MediumButton(props: ButtonProps) {
  return <StyledButton {...props} />;
}

const Button = { MediumButton, LargeButton };

export default Button;

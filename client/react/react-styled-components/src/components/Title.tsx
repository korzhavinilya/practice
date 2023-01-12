import styled from 'styled-components';
import { ThemeWrapperType } from '..';

const StyledTitle = styled.h1`
  color: ${({ color, theme }: TitleProps & ThemeWrapperType) =>
    color || theme.colors.primary};
`;

type TitleProps = {
  children: React.ReactNode;
  color?: string;
};

export default function Title(props: TitleProps) {
  return <StyledTitle {...props}>{props.children}</StyledTitle>;
}

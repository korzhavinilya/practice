import styled from 'styled-components';
import { ThemeWrapperType } from '..';

const StyledLine = styled.div`
  font-size: 24px;
  color: ${({ color, theme }: LineProps & ThemeWrapperType) =>
    color || theme.colors.primary};
`;

type LineProps = {
  color?: string;
  children: React.ReactNode;
};

export default function Line(props: LineProps) {
  return <StyledLine {...props} />;
}

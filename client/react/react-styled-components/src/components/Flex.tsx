import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }: FlexProps) => direction || 'row'};
  align-items: ${({ align }: FlexProps) => align || 'stretch'};
  justify-content: ${({ justify }: FlexProps) => justify || 'stretch'};
  margin: ${({ margin }: FlexProps) => margin || '0'};
`;

type FlexProps = {
  children: React.ReactNode;
  direction?: string;
  align?: string;
  justify?: string;
  margin?: string;
};

export default function Flex(props: FlexProps) {
  return <StyledFlex {...props}>{props.children}</StyledFlex>;
}

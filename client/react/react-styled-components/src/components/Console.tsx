import { useState } from 'react';
import styled from 'styled-components';
import { ThemeWrapperType } from '..';
import Flex from './Flex';
import Line from './Line';

const StyledConsole = styled.textarea`
  width: 100%;
  height: 70vh;
  background: black;
  font-size: 24px;
  border: none;
  color: ${({ color, theme }: ConsoleProps & ThemeWrapperType) =>
    color || theme.colors.primary};
  resize: none;
  &:focus {
    outline: none;
  }
  @media ${(props: ThemeWrapperType) => props.theme.media.phone} {
    border: 1px solid red;
  }
  @media ${(props: ThemeWrapperType) => props.theme.media.tablet} {
    border: 1px solid green;
  }
`;

type ConsoleProps = {
  color?: string;
};

export default function Console({ color, ...props }: ConsoleProps) {
  const [lines, setLines] = useState(['user@lenovo:']);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setLines([...lines, 'user@lenovo:']);
    }
  };

  return (
    <Flex>
      <Flex direction="column" margin="0 10px">
        {lines.map((line) => (
          <Line color={color}>{line}</Line>
        ))}
      </Flex>
      <StyledConsole color={color} {...props} onKeyDown={handleKeyPress} />
    </Flex>
  );
}

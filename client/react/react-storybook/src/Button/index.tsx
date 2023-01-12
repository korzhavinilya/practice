import { PropsWithChildren } from 'react';

type ButtonProps = {
  primary?: boolean;
};

export default function Button({
  primary,
  children,
}: PropsWithChildren<ButtonProps>) {
  return <button>{children}</button>;
}

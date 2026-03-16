import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', label: 'Click Me' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete' },
};
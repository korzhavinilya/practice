import React from 'react';

interface Props {
  variant: 'primary' | 'danger';
  label: string;
}

export const Button = ({ variant, label }: Props) => {
  const style: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#007bff' : '#dc3545',
    color: 'white',
    fontSize: '16px'
  };

  return <button style={style}>{label}</button>;
};
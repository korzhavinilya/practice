import React from 'react';

export default function Input({ type = 'text', value, onChange, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

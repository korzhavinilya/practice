import React from 'react';
import { useFormStateContext } from './FormStateContext';

export default function Stepper() {
  const { step } = useFormStateContext();

  return <h2>Step: {step === 0 ? '*' : step === 1 ? '**' : ''}</h2>;
}

import React from 'react';
import { useFormStateContext } from './FormStateContext';

export default function Actions() {
  const { nextStep, prevStep, submit } = useFormStateContext();
  return (
    <>
      <hr />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={prevStep}>Prev</button>
        <button onClick={nextStep}>Next</button>
        <button onClick={submit}>Submit</button>
      </div>
    </>
  );
}

import React from 'react';
import Actions from './Actions';
import FormContent from './FormContent';
import FormStateProvider from './FormStateProvider';
import Stepper from './Stepper';

export default function App() {
  return (
    <FormStateProvider>
      <Stepper />
      <FormContent />
      <Actions />
    </FormStateProvider>
  );
}

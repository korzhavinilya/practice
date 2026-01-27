import { useState } from 'react';
import { FormStateContext } from './FormStateContext';

export default function FormStateProvider({ children }) {
  const [step, setStep] = useState(0);
  const [firstForm, setFirstForm] = useState({ type: '', name: '' });
  const [secondForm, setSecondForm] = useState({ phone: '', address: '' });

  function nextStep() {
    if (step <= 0) {
      setStep((step) => step + 1);
    }
  }

  function prevStep() {
    if (step >= 1) {
      setStep((step) => step - 1);
    }
  }

  function submit() {
    alert(JSON.stringify(firstForm));
    alert(JSON.stringify(secondForm));
  }

  return (
    <FormStateContext.Provider
      value={{
        step,
        firstForm,
        secondForm,
        nextStep,
        prevStep,
        submit,
        setFirstForm,
        setSecondForm,
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
}

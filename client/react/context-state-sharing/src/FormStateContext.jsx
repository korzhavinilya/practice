import { useContext } from 'react';
import { createContext } from 'react';

const defaultValue = {
  step: 0,
  firstForm: {
    type: '',
    name: '',
  },
  secondForm: {
    phone: 0,
    address: '',
  },
  nextStep() {},
  prevStep() {},
  submit() {},
  setFirstForm() {},
  setSecondForm() {},
};

export const FormStateContext = createContext(defaultValue);

export const useFormStateContext = () => useContext(FormStateContext);

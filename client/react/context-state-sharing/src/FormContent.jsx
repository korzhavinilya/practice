import FirstForm from './FirstForm';
import { useFormStateContext } from './FormStateContext';
import SecondForm from './SecondForm';

export default function FormContent() {
  const { step } = useFormStateContext();
  return step === 0 ? <FirstForm /> : <SecondForm />;
}

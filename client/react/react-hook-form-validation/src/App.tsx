import * as React from 'react';
import { useForm } from 'react-hook-form';
import Headers from './Header';
import './AppStyles.css';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  developer: boolean;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  renderCount++;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  function sleep(ms: number) {
    return new Promise((res) => {
      setTimeout(res, ms);
    });
  }

  async function validateAge(age: number) {
    await sleep(3000);
    if (!age || age < 18) {
      return 'Age should be higher than 18';
    }
    return true;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <label htmlFor="firstName">First Name:</label>
      <input
        {...register('firstName', { required: 'This is required.' })}
        id="firstName"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name:</label>
      <input
        {...register('lastName', {
          required: 'This is required.',
          minLength: { value: 5, message: 'Min length is 5' },
        })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label htmlFor="age">Age</label>
      <input
        type="number"
        {...register('age', {
          valueAsNumber: true,
          validate: validateAge,
        })}
        id="age"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="gender"></label>
      <select {...register('gender')} id="gender">
        <option value="">Select...</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <label htmlFor="developer">Are you a developer?</label>
      <input {...register('developer')} type="checkbox" />

      <input type="submit" />
    </form>
  );
}

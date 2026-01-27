import React from 'react';
import { useFormStateContext } from './FormStateContext';

export default function FirstForm() {
  const { firstForm, setFirstForm } = useFormStateContext();

  return (
    <>
      <hr />
      <h3>First Form</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <label>
          Name:{' '}
          <input
            value={firstForm.name}
            onChange={(e) =>
              setFirstForm({ ...firstForm, name: e.target.value })
            }
          />
        </label>

        <label>
          Type:{' '}
          <select
            value={firstForm.type}
            onChange={(e) =>
              setFirstForm({ ...firstForm, type: e.target.value })
            }
          >
            <option label="None" value=""></option>
            <option>DSP</option>
            <option>ER2S</option>
            <option>Legacy</option>
          </select>
        </label>
      </div>
    </>
  );
}

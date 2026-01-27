import React from 'react';
import { useFormStateContext } from './FormStateContext';

export default function FirstForm() {
  const { secondForm, setSecondForm } = useFormStateContext();

  return (
    <>
      <hr />
      <h3>Second Form</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <label>
          Phone:{' '}
          <input
            value={secondForm.phone}
            onChange={(e) =>
              setSecondForm({ ...secondForm, phone: e.target.value })
            }
          />
        </label>

        <label>
          Address:{' '}
          <input
            value={secondForm.address}
            onChange={(e) =>
              setSecondForm({ ...secondForm, address: e.target.value })
            }
          />
        </label>
      </div>
    </>
  );
}

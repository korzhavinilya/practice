import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from './common/redux/hooks/redux';
import {
  asyncChangeData,
  changeAge,
  changeName,
  selectUser,
} from './common/redux/slices/userSlice';

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="App">
      <h1>Redux / toolkit</h1>
      <hr />
      <h1>Name: {user.name}</h1>
      <h1>Age: {user.age}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(changeName(name));
          dispatch(changeAge(age));
        }}
      >
        <input
          ref={ref}
          onChange={(e) => setName(e.target.value)}
          placeholder="Change name"
        />
        <input
          onChange={(e) => setAge(+e.target.value)}
          placeholder="Change age"
        />

        <button
          type="button"
          onClick={() => {
            dispatch(asyncChangeData('Илья'));
          }}
        >
          async
        </button>

        <input type="submit" value="Change user details" />
      </form>
    </div>
  );
}

export default App;

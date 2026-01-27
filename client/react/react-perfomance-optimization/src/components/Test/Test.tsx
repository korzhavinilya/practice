import { useCallback, useState } from 'react';
import Item from './components/Item/Item';
import './Test.css';

const initialData = [
  { value: '', id: 1 },
  { value: '', id: 2 },
  {
    value: '',
    id: 3,
  },
];

export default function Test() {
  const [data, setData] = useState(initialData);

  const changeData = useCallback((id: number, value: string) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          item.value = value;
        }

        return item;
      })
    );
  }, []);

  return (
    <div className="wrapper">
      <p>{JSON.stringify(data)}</p>

      <div className="items">
        {data.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              value={item.value}
              changeData={changeData}
            />
          );
        })}
      </div>
    </div>
  );
}

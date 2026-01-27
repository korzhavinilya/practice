import React, { memo } from 'react';
import './Item.css';

interface ItemProps {
  id: number;
  value: string;
  changeData: (id: number, value: string) => void;
}

function Item({ id, value, changeData }: ItemProps) {
  console.log('render', id);

  return (
    <div className="item">
      <p>id: {id}</p>
      <input value={value} onChange={(e) => changeData(id, e.target.value)} />
    </div>
  );
}

export default memo(Item);
// export default Item;

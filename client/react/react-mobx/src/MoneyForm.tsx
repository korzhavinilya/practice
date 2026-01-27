import { observer } from 'mobx-react';
import { useState } from 'react';
import Athlete from './Athlete';

type TradeFormProps = {
  athlete: Athlete;
};

function MoneyForm({ athlete }: TradeFormProps) {
  const [total, setTotal] = useState(0);
  const [years, setYears] = useState(0);
  const [salary, setSalary] = useState(0);

  return (
    <div>
      <input
        type="text"
        placeholder="Team name..."
        onChange={(e) => setTeamName(e.target.value)}
      />
      <span>
        <button onClick={() => athlete.tradePlayer(teamName)}>Trade</button>
      </span>
    </div>
  );
}

export default observer(MoneyForm);

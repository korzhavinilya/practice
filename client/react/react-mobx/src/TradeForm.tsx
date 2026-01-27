import { observer } from 'mobx-react';
import { useState } from 'react';
import Athlete from './Athlete';

type TradeFormProps = {
  athlete: Athlete;
};

function TradeForm({ athlete }: TradeFormProps) {
  const [teamName, setTeamName] = useState('');

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

export default observer(TradeForm);

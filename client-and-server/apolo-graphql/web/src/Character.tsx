import { useParams } from 'react-router-dom';
import useCharacter from './common/hooks/useCharacter';

export default function Character() {
  let { id } = useParams();
  const { loading, data } = useCharacter(id || '');

  console.log(data);

  return (
    <div>
      {loading ? (
        'loading...'
      ) : (
        <div>
          <img src={data?.character?.image} alt="Character" />
          <h2>{data?.character?.name}</h2>
        </div>
      )}
    </div>
  );
}

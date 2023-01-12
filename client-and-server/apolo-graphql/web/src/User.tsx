import { useParams } from 'react-router-dom';
import useUser from './common/hooks/useUser';

export default function User() {
  let { name } = useParams();
  const { loading, data } = useUser(name || '');

  console.log(data);

  return (
    <div>
      {loading ? (
        'loading...'
      ) : (
        <div>
          <h2>{data?.users[0]?.name}</h2>
        </div>
      )}
    </div>
  );
}

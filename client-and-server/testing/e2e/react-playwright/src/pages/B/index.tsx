import { Link } from 'react-router-dom';

export default function B() {
  return (
    <div>
      B Page
      <br />
      <Link to={'/c'}>go to C</Link>
    </div>
  );
}

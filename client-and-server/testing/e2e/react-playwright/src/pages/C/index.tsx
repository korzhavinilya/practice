import { Link } from 'react-router-dom';

export default function C() {
  return (
    <div>
      C Page
      <br />
      <Link to={'/'}>go to A</Link>
    </div>
  );
}

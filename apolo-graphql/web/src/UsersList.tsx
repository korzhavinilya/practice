import { useNavigate } from 'react-router-dom';
import User from './common/interfaces/user.interface';

interface UsersListProps {
  users?: User[];
}

export default function UsersList({ users = [] }: UsersListProps) {
  const navigate = useNavigate();

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id} onClick={() => navigate('/users/' + user.name)}>
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
          <h4>{user.phone}</h4>
        </li>
      ))}
    </ul>
  );
}

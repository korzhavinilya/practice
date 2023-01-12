import { useQuery, gql } from '@apollo/client';
import { UsersResponse } from '../interfaces/user.interface';

const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
      phone
    }
  }
`;

export default function useUsers() {
  const users = useQuery<UsersResponse>(GET_USERS);
  const { error, loading, data } = users;

  return {
    error,
    loading,
    data,
  };
}

import { useQuery, gql } from '@apollo/client';
import { UsersResponse } from '../interfaces/user.interface';

const GET_USER = gql`
  query GetUser($name: String!) {
    users(limit: 1, filter: { name: $name }) {
      _id
      name
      email
      phone
    }
  }
`;

export default function useUser(name: string) {
  const user = useQuery<UsersResponse>(GET_USER, {
    variables: {
      name,
    },
  });

  const { error, loading, data } = user;

  return {
    error,
    loading,
    data,
  };
}

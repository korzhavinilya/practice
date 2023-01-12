import { useQuery, gql } from '@apollo/client';
import { CharacterResponse } from '../interfaces/character.interface';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      episode {
        name
        episode
      }
    }
  }
`;

export default function useCharacter(id: string) {
  const character = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: {
      id,
    },
  });

  const { error, loading, data } = character;

  return {
    error,
    loading,
    data,
  };
}

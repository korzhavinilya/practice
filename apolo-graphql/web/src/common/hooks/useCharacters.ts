import { useQuery, gql } from '@apollo/client';
import { CharactersResponse } from '../interfaces/character.interface';

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default function useCharacters() {
  const characters = useQuery<CharactersResponse>(GET_CHARACTERS);
  const { error, loading, data } = characters;

  return {
    error,
    loading,
    data,
  };
}

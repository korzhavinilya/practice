import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const GET_CHARACTER_LOCATION = gql`
  query GetCharacterLocations($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          name
        }
      }
    }
  }
`;

export default function Search() {
  const [name, setName] = useState('');

  const [getLocations, { loading, error, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATION,
    {
      variables: {
        name,
      },
    }
  );

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => getLocations()}>Search</button>
      {loading && 'Loading...'}
      {data && (
        <div>
          {data.characters.results.map((character: any) => (
            <div>{character.location.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

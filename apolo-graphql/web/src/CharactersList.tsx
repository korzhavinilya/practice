import { useNavigate } from 'react-router-dom';
import Character from './common/interfaces/character.interface';

interface CharactersListProps {
  characters?: Character[];
}

export default function CharactersList({
  characters = [],
}: CharactersListProps) {
  const navigate = useNavigate();

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id} onClick={() => navigate('/' + character.id)}>
          <img src={character.image} alt="Character" />
          <h2>{character.name}</h2>
        </li>
      ))}
    </ul>
  );
}

import CharactersList from './CharactersList';
import useCharacters from './common/hooks/useCharacters';

export default function Characters() {
  const { data, loading } = useCharacters();
  return loading ? (
    <>Loading...</>
  ) : (
    <CharactersList characters={data?.characters.results} />
  );
}

export default interface Character {
  id: string;
  name: string;
  image: string;
}

export interface CharactersResponse {
  characters: {
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

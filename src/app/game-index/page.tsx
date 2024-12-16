import loadCharacters, {
  CvCharacter,
  CvCharacterTab,
  SentinelsComicsCharacter,
} from "@/lib/character-loader";
import Link from "next/link";

type GameIndex = { [key: string]: CvCharacter[] };

function push(gameIndex: GameIndex, key: string, character: CvCharacter) {
  if (!gameIndex[key]) {
    gameIndex[key] = [];
  }
  gameIndex[key].push(character);
  return gameIndex;
}

function parseMasksCharacter(
  gameIndex: GameIndex,
  character: CvCharacter,
  tab: CvCharacterTab
): GameIndex {
  return gameIndex;
}

function parseSentinelsCharacter(
  gameIndex: GameIndex,
  character: CvCharacter,
  tab: CvCharacterTab
): GameIndex {
  const characterData = tab.data as SentinelsComicsCharacter;
  push(
    gameIndex,
    `${characterData.archetype} Archetype (Sentinels Comics)`,
    character
  );
  push(
    gameIndex,
    `${characterData.background} Background (Sentinels Comics)`,
    character
  );
  push(
    gameIndex,
    `${characterData.personality} Personality (Sentinels Comics)`,
    character
  );
  push(
    gameIndex,
    `${characterData.powerSource} Power Source (Sentinels Comics)`,
    character
  );
  return gameIndex;
}

export default function GameIndex() {
  const characters = loadCharacters();

  const gameIndex = characters.reduce((gameIndex, character) => {
    for (let tab of Object.values(character.tabs)) {
      if (tab.data["template"] == "masks") {
        gameIndex = parseMasksCharacter(gameIndex, character, tab);
      }
      if (tab.data["template"] == "sentinels-comics") {
        gameIndex = parseSentinelsCharacter(gameIndex, character, tab);
      }
    }
    return gameIndex;
  }, {} as GameIndex);

  const keys = Object.keys(gameIndex).sort();

  return (
    <div className="fixed-grid">
      <div className="grid">
        {keys.map((key) => (
          <div className="cell">
            <h3 className="subtitle">{key}</h3>
            <ul>
              {gameIndex[key].map((character) => (
                <li key={character.id}>
                  <Link href={`/characters/${character.id}`}>
                    {character.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

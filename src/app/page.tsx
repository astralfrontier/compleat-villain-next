import loadCharacters from "@/lib/character-loader";
import Link from "next/link";

import styles from "./page.module.sass";

export default function Home() {
  const characters = loadCharacters();

  const sortedCharacters = characters.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <>
      <div className="grid">
        {sortedCharacters.map((character) => (
          <div className="cell" key={character.id}>
            <Link
              className={styles.cardlink}
              href={`/characters/${character.id}`}
            >
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">{character.name}</div>
                </div>
                <div className="card-content">
                  {character.pitch || "No pitch for this character"}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

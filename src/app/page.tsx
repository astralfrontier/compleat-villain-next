import loadCharacters from "@/lib/character-loader";
import Link from "next/link";

export default function Home() {
  const characters = loadCharacters();
  return (
    <>
      <div className="grid">
        {characters.map((character) => (
          <div className="cell" key={character.id}>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">
                  <Link href={`/characters/${character.id}`}>
                    {character.name}
                  </Link>
                </div>
              </div>
              <div className="card-content">
                {character.pitch || "No pitch for this character"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

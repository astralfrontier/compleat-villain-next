import characters from "@/lib/character-loader";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link href={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

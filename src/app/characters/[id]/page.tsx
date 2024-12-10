import { Metadata } from "next";
import characters from "@/lib/character-loader";
import CharacterTabs from "./CharacterTabs";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = characters.find((character) => character.id == id);
  return (
    <>
      {character ? (
        <CharacterTabs character={character} />
      ) : (
        <h1>Character Not Found</h1>
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = characters.find((character) => character.id == id);
  return {
    title: character?.name || "No name",
    description: character?.pitch || "This character does not have a pitch",
  };
}

export async function generateStaticParams() {
  return characters.map((character) => ({ id: character.id }));
}

import { CvCharacter } from "@/lib/character-loader";
import { Metadata } from "next";
import characters from "@/lib/character-loader";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = characters.find((character) => character.id == id);
  return (
    <>
      <pre>{JSON.stringify(character, null, 2)}</pre>
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

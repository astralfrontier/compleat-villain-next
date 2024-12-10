import { Metadata } from "next";
import CharacterTabs from "./CharacterTabs";
import loadCharacters from "@/lib/character-loader";
import { AffiliationLink } from "./CharacterDefaultView";
import loadArt from "@/lib/art-loader";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const characters = loadCharacters();
  const art = loadArt();

  const character = characters.find((character) => character.id == id);
  if (!character) {
    throw new Error("Character not found, this shouldn't happen");
  }

  const images = art.filter((item) => item.faces.includes(character.name));

  // We want to link to character affiliations by name
  const affiliations = character?.affiliations
    ? character.affiliations.map((affiliation) => ({
        name: affiliation,
        character: characters.find(
          (affiliatedCharacter) => affiliatedCharacter.name == affiliation
        ),
      }))
    : [];
  const affiliationLinks: AffiliationLink[] = affiliations.map(
    (affiliation) => ({
      name: affiliation.name,
      url: affiliation.character
        ? `/characters/${affiliation.character.id}`
        : "",
    })
  );

  return (
    <>
      {character ? (
        <CharacterTabs
          character={character}
          affiliationLinks={affiliationLinks}
          art={images}
        />
      ) : (
        <h1>Character Not Found</h1>
      )}
    </>
  );
}

// TODO: call loadArt, find the preferred image, and include it in opengraph metadata
export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const characters = loadCharacters();
  const character = characters.find((character) => character.id == id);
  return {
    title: character?.name || "No name",
    description: character?.pitch || "This character does not have a pitch",
  };
}

export async function generateStaticParams() {
  const characters = loadCharacters();
  return characters.map((character) => ({ id: character.id }));
}

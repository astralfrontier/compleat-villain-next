"use client";

import { CvCharacter, CvCharacterTab } from "@/lib/character-loader";

import styles from "./page.module.sass";

interface PanelBlockProps {
  name: string;
  value: any;
  children?: React.ReactNode;
}

interface CharacterDefaultViewProps {
  character: CvCharacter;
  tab: CvCharacterTab;
}

function CharacterElement(props: PanelBlockProps) {
  return props.value ? (
    <div className={`columns ${styles.characterElement}`}>
      <div className="column is-one-quarter">
        <div className="has-background-grey-dark">
          <strong className="has-text-white p-1">{props.name}</strong>
        </div>
      </div>
      <div className="column">
        {props.children ? props.children : props.value}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default function CharacterDefaultView(props: CharacterDefaultViewProps) {
  const { character, tab } = props;

  return (
    <div className="columns">
      <div className="column is-one-third">
        <p className="title">{character.name}</p>
        <CharacterElement name="Aliases" value={character.aliases} />
        <CharacterElement name="Pitch" value={character.pitch} />
        <CharacterElement name="Scope" value={character.scope} />
        <CharacterElement name="Motivation" value={character.motivation} />
        <CharacterElement name="Origin" value={character.origin} />
        <CharacterElement name="Role" value={character.role} />
        <CharacterElement name="Abilities" value={character.abilities} />
        <CharacterElement name="Struggles" value={character.struggles} />
        <CharacterElement name="Affiliations" value={character.affiliations}>
          <ul>
            {character.affiliations?.map((affiliation) => (
              <li key={affiliation}>{affiliation}</li>
            ))}
          </ul>
        </CharacterElement>
      </div>
      <div className="column is-two-thirds">
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: tab.content }}></div>
        </div>
      </div>
    </div>
  );
}

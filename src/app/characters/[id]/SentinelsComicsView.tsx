"use client";

import ArtImage from "@/app/ArtImage";
import { CvArt } from "@/lib/art-loader";
import { CvCharacter, CvCharacterTab } from "@/lib/character-loader";

interface SentinelsComicsRankedAttribute {
  name: string;
  dice: string;
}

interface SentinelsComicsAbility {
  name: string;
  type: string;
  text: string;
}

interface SentinelsComicsCharacter {
  background?: string;
  powerSource?: string;
  archetype?: string;
  personality?: string;
  health?: { [key: string]: SentinelsComicsRankedAttribute };
  qualities?: SentinelsComicsRankedAttribute[];
  powers?: SentinelsComicsRankedAttribute[];
  abilities?: { [key: string]: SentinelsComicsAbility[] };
  principles?: SentinelsComicsAbility[];
}

interface SentinelsComicsAbilityProps {
  color: string;
  abilities: SentinelsComicsAbility[];
}

function SentinelsComicsAbility(props: SentinelsComicsAbilityProps) {
  const { color, abilities } = props;

  return (
    <>
      <h1 className="subtitle">{color}</h1>
      {abilities.map((ability) => (
        <div className="columns" key={ability.name}>
          <div className="column is-one-third">
            {ability.name} ({ability.type})
          </div>
          <div className="column">{ability.text}</div>
        </div>
      ))}
    </>
  );
}

interface SentinelsComicsViewProps {
  character: CvCharacter;
  tab: CvCharacterTab;
  art: CvArt[];
}

export default function SentinelsComicsView(props: SentinelsComicsViewProps) {
  const { character, tab, art } = props;
  const primaryArt = art.find((artItem) => artItem.preferred) || art[0];
  const sentinelsCharacter = tab.data as SentinelsComicsCharacter;

  return (
    <>
      <div className="columns">
        {art ? (
          <div className="column is-one-third">
            {primaryArt ? <ArtImage art={primaryArt} /> : <></>}
          </div>
        ) : (
          <></>
        )}
        <div className="column">
          <h1 className="title">{character.name}</h1>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: tab.content }}></div>
          </div>
          <ul>
            <li>
              <strong>Background</strong>: {sentinelsCharacter.background}
            </li>
            <li>
              <strong>Archetype</strong>: {sentinelsCharacter.archetype}
            </li>
            <li>
              <strong>Power Source</strong>: {sentinelsCharacter.powerSource}
            </li>
            <li>
              <strong>Background</strong>: {sentinelsCharacter.background}
            </li>
          </ul>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-third">
          <h3 className="subtitle">Powers</h3>
          <ul>
            {(sentinelsCharacter.powers || []).map((power) => (
              <li key={power.name}>
                {power.name} ({power.dice})
              </li>
            ))}
          </ul>
        </div>
        <div className="column is-one-third">
          <h3 className="subtitle">Qualities</h3>
          <ul>
            {(sentinelsCharacter.qualities || []).map((quality) => (
              <li key={quality.name}>
                {quality.name} ({quality.dice})
              </li>
            ))}
          </ul>
        </div>
        <div className="column is-one-third">
          <h3 className="subtitle">Status</h3>
          {sentinelsCharacter.health ? (
            <ul>
              <li>
                Green: {sentinelsCharacter.health["green"].dice} (
                {sentinelsCharacter.health["green"].name})
              </li>
              <li>
                Yellow: {sentinelsCharacter.health["yellow"].dice} (
                {sentinelsCharacter.health["yellow"].name})
              </li>
              <li>
                Red: {sentinelsCharacter.health["red"].dice} (
                {sentinelsCharacter.health["red"].name})
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      {sentinelsCharacter.abilities && sentinelsCharacter.abilities["green"] ? (
        <SentinelsComicsAbility
          color="Green"
          abilities={sentinelsCharacter.abilities["green"]}
        />
      ) : (
        <></>
      )}
      {sentinelsCharacter.abilities &&
      sentinelsCharacter.abilities["yellow"] ? (
        <SentinelsComicsAbility
          color="Yellow"
          abilities={sentinelsCharacter.abilities["yellow"]}
        />
      ) : (
        <></>
      )}
      {sentinelsCharacter.abilities && sentinelsCharacter.abilities["red"] ? (
        <SentinelsComicsAbility
          color="Red"
          abilities={sentinelsCharacter.abilities["red"]}
        />
      ) : (
        <></>
      )}
      {sentinelsCharacter.abilities && sentinelsCharacter.abilities["out"] ? (
        <SentinelsComicsAbility
          color="Out"
          abilities={sentinelsCharacter.abilities["out"]}
        />
      ) : (
        <></>
      )}
    </>
  );
}

// Helper functions for loading character data

import fs from "node:fs";
import path from "node:path";
import markdownit from "markdown-it";
import slug from "slug";
import yaml from "js-yaml";
const matter = require("gray-matter");

export interface CvCharacterTab {
  data: { [key: string]: any };
  content: string;
}

// What does a character look like?
export interface CvCharacter {
  // A slug for representing the character name in a URL-friendly fashion
  id: string;

  // The character's official name, usually a callsign or hero name
  name: string;

  // Real name, any other identities
  aliases?: string;

  // A sentence on why this character should interest you
  pitch?: string;

  // Any existing comic book characters that resemble this character
  inspirations?: string;

  // What's the dramatic scope (e.g. city, galaxy) for this character?
  scope?: string;

  // What motivates this character?
  motivation?: string;

  // How did this character get their powers and become a hero/villain/etc.?
  origin?: string;

  // What story role does this character occupy?
  role?: string;

  // What powers or special abilities does this character possess?
  abilities?: string;

  // What obstacles or problems does this character face?
  struggles?: string;

  // What teams or other characters does this character associate with?
  affiliations?: string[];

  // Any tabs to show about this character. Records are (tab name, tab contents)
  tabs: Record<string, CvCharacterTab>;
}

export interface SentinelsComicsRankedAttribute {
  name: string;
  dice: string;
}

export interface SentinelsComicsAbility {
  name: string;
  type: string;
  text: string;
}

export interface SentinelsComicsCharacter {
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

export interface SentinelsComicsAbilityProps {
  color: string;
  abilities: SentinelsComicsAbility[];
}

// NEXTJS_ROOT comes from next.config.ts at the root level
const DATA_CHARACTERS_ROOT = path.join(
  process.env.NEXTJS_ROOT || ".",
  "src",
  "data",
  "characters"
);

function loadCharacters(): CvCharacter[] {
  const md = markdownit();
  try {
    return fs.readdirSync(DATA_CHARACTERS_ROOT).map((characterPath) => {
      const fullCharacterPath = path.join(DATA_CHARACTERS_ROOT, characterPath);

      const characterJson: CvCharacter = yaml.load(
        fs
          .readFileSync(path.join(fullCharacterPath, "character.yaml"))
          .toString()
      ) as CvCharacter;

      const tabList: CvCharacterTab[] = fs
        .readdirSync(fullCharacterPath)
        .filter((filepath) => filepath.endsWith(".md"))
        .map((datafile) => {
          const gm = matter(
            fs.readFileSync(path.join(fullCharacterPath, datafile))
          );
          return {
            data: gm.data,
            content: md.render(gm.content),
          };
        });
      const tabs = tabList.reduce(
        (tabs: Record<string, CvCharacterTab>, tab: CvCharacterTab) => {
          // Perform an ugly cast on the assumption that the "name" key exists
          const tabName: string =
            (tab.data as Record<string, string>)["name"] || "Unknown";
          tabs[tabName] = tab;
          return tabs;
        },
        {} as Record<string, CvCharacterTab>
      );
      return {
        // Specify a default character ID, but let the JSON override it
        // @ts-ignore
        id: slug(characterJson.name),
        ...characterJson,
        tabs,
      };
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default loadCharacters;

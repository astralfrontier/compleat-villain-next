// Helper functions for loading character data

import fs from "node:fs";
import path from "node:path";
const matter = require("gray-matter");

export interface CvCharacterTab {
  data: object;
  content: string;
}

// What does a character look like?
export interface CvCharacter {
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

// NEXTJS_ROOT comes from next.config.ts at the root level
const DATA_CHARACTERS_ROOT = path.join(
  process.env.NEXTJS_ROOT || ".",
  "src",
  "data",
  "characters"
);

function loadCharacters(): CvCharacter[] {
  try {
    return fs.readdirSync(DATA_CHARACTERS_ROOT).map((characterPath) => {
      const fullCharacterPath = path.join(DATA_CHARACTERS_ROOT, characterPath);

      const characterJson: CvCharacter = JSON.parse(
        fs
          .readFileSync(path.join(fullCharacterPath, "character.json"))
          .toString()
      );

      const tabList: CvCharacterTab[] = fs
        .readdirSync(fullCharacterPath)
        .filter((filepath) => filepath.endsWith(".md"))
        .map((datafile) => {
          const gm = matter(
            fs.readFileSync(path.join(fullCharacterPath, datafile))
          );
          return {
            data: gm.data,
            content: gm.content,
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
        ...characterJson,
        tabs,
      };
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default loadCharacters();
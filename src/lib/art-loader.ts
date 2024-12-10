// Helper functions for loading character data

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export interface CvArt {
  // A name or caption for the art piece itself
  caption: string;

  // Characters or entities that appear in this picture, by name
  faces: string[];

  // Is this image the preferred image for who it contains?
  preferred?: boolean;

  // A valid URL to the image
  url: string;

  // Dimensions for the image
  width: number;
  height: number;

  // Attribution - who created it?
  attribution: string;
}

// NEXTJS_ROOT comes from next.config.ts at the root level
const DATA_ART_ROOT = path.join(
  process.env.NEXTJS_ROOT || ".",
  "src",
  "data",
  "art"
);

function loadArt(): CvArt[] {
  const yamlFiles = fs
    .readdirSync(DATA_ART_ROOT)
    .filter((filename) => filename.endsWith(".yaml"))
    .map((filename) =>
      fs.readFileSync(path.join(DATA_ART_ROOT, filename)).toString()
    );
  // Treat all YAML files as a single blob
  const data = yaml.load(yamlFiles.join("\n"));
  return data as CvArt[];
}

export default loadArt;

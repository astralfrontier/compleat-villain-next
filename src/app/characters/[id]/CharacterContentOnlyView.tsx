"use client";

import { CvArt } from "@/lib/art-loader";
import { CvCharacter, CvCharacterTab } from "@/lib/character-loader";

interface CharacterGenericViewProps {
  character: CvCharacter;
  tab: CvCharacterTab;
  art: CvArt[];
}

export default function CharacterContentOnlyView(
  props: CharacterGenericViewProps
) {
  const { tab } = props;

  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: tab.content }}></div>
    </div>
  );
}

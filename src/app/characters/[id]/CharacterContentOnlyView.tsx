"use client";

import { CvCharacter, CvCharacterTab } from "@/lib/character-loader";

interface CharacterGenericViewProps {
  character: CvCharacter;
  tab: CvCharacterTab;
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

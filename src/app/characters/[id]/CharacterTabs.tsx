"use client";

import { CvCharacter } from "@/lib/character-loader";
import { useState } from "react";
import CharacterDefaultView from "./CharacterDefaultView";
import CharacterContentOnlyView from "./CharacterContentOnlyView";

interface CharacterTabsProps {
  character: CvCharacter;
}

export default function CharacterTabs(props: CharacterTabsProps) {
  const { character } = props;
  const [selectedTab, setSelectedTab] = useState<string>("default");
  const clickToSelectTab = (tabName: string) => () => setSelectedTab(tabName);

  return (
    <>
      <div className="tabs">
        <ul>
          <li className={selectedTab == "default" ? "is-active" : ""}>
            <a onClick={clickToSelectTab("default")}>{character.name}</a>
          </li>
          {Object.keys(character.tabs)
            .filter((tabName) => tabName != "default")
            .map((tabName) => (
              <li
                className={selectedTab == tabName ? "is-active" : ""}
                key={tabName}
              >
                <a onClick={clickToSelectTab(tabName)}>{tabName}</a>
              </li>
            ))}
        </ul>
      </div>
      {Object.keys(character.tabs).map((tabName) => {
        if (selectedTab == tabName) {
          const tab = character.tabs[tabName];
          const template =
            (tab.data as Record<string, string>)["template"] || "default";
          switch (template) {
            case "default":
              return (
                <CharacterDefaultView
                  character={character}
                  tab={tab}
                  key={tabName}
                />
              );
            default:
              return (
                <CharacterContentOnlyView
                  character={character}
                  tab={tab}
                  key={tabName}
                />
              );
          }
        }
      })}
    </>
  );
}

"use client";

import { CvCharacter } from "@/lib/character-loader";
import { useState } from "react";
import CharacterDefaultView, { AffiliationLink } from "./CharacterDefaultView";
import CharacterContentOnlyView from "./CharacterContentOnlyView";
import { CvArt } from "@/lib/art-loader";
import SentinelsComicsView from "./SentinelsComicsView";

interface CharacterTabsProps {
  character: CvCharacter;
  affiliationLinks: AffiliationLink[];
  art: CvArt[];
}

export default function CharacterTabs(props: CharacterTabsProps) {
  const { character, art } = props;
  const [selectedTab, setSelectedTab] = useState<string>("default");
  const clickToSelectTab = (tabName: string) => () => setSelectedTab(tabName);
  const sortedTabs = Object.keys(character.tabs).sort();

  return (
    <>
      <div className="tabs">
        <ul>
          <li className={selectedTab == "default" ? "is-active" : ""}>
            <a onClick={clickToSelectTab("default")}>{character.name}</a>
          </li>
          {sortedTabs
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
      {sortedTabs.map((tabName) => {
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
                  affiliationLinks={props.affiliationLinks}
                  art={art}
                  key={tabName}
                />
              );
            case "sentinels-comics":
              return (
                <SentinelsComicsView
                  character={character}
                  tab={tab}
                  art={art}
                  key={tabName}
                />
              );
            default:
              return (
                <CharacterContentOnlyView
                  character={character}
                  tab={tab}
                  art={art}
                  key={tabName}
                />
              );
          }
        }
      })}
    </>
  );
}

import classNames from "classnames";
import React from "react";
import { findIndexesToHighlightInWord } from "../utils";

interface IProps {
  name: string;
  searchString: string;
  isHeading?: boolean;
  url: string;
  id: number;
  activeId: number;
}

export const DisplayName: React.FunctionComponent<IProps> = ({ name, searchString, isHeading, url, activeId, id }) => {
  const isDisplayNameActive = (id: number) => activeId === id;
  const { startHighlightingFrom, stopHighlightingFrom } = findIndexesToHighlightInWord(name, searchString);
  const displayNameStyle = classNames({ "active-project-display-name": isDisplayNameActive(id), "project-display-name": true });
  return (
    <button
      className={displayNameStyle}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      {Array.from({ length: name.length }).map((_, index) => {
        const shouldHighlightLetter = index >= startHighlightingFrom && index <= stopHighlightingFrom;
        const menuNameClassList = classNames({
          "highlighted-letter": shouldHighlightLetter,
          "project-group-header": isHeading,
        });
        return (
          <span key={index} className={menuNameClassList}>
            {name.charAt(index)}
          </span>
        );
      })}
    </button>
  );
};

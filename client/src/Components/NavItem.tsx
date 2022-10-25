import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { Project } from "./Project";
import { NavItemSearch } from "./NavItemSearch";
import { getfilteredProjectData } from "../utils";
import { useArrowSelection } from "../Hooks/useArrowSelection";
import { useFetchData } from "../Hooks/useFetchData";

interface IProps {
  projectDataUrl: string;
  title: string;
}

export const NavItem: React.FunctionComponent<IProps> = ({ title, projectDataUrl }) => {
  const [projectData, isLoading] = useFetchData(projectDataUrl);
  const hasItems = !!projectData;
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchString, setSearchString] = useState("");
  const filteredProjectData = getfilteredProjectData(projectData ?? [], searchString);
  const activeId = useArrowSelection(filteredProjectData, searchString, showDropdown);
  const handleSearch = useCallback((seachStr: string) => {
    setSearchString(seachStr);
  }, []);
  const listItemClass = classNames({
    "navigation-item": true,
    "navigation-item-hover": showDropdown,
  });

  return (
    <li
      className={listItemClass}
      onMouseEnter={() => {
        setShowDropdown(true);
      }}
      onMouseLeave={() => {
        setShowDropdown(false);
      }}
    >
      <h1>{title}</h1>
      {showDropdown && (
        <div className="project-container">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <>
              {hasItems && (
                <>
                  <NavItemSearch handleSearch={handleSearch} searchString={searchString} />
                  {filteredProjectData.map((project) => {
                    return <Project {...project} searchString={searchString} activeId={activeId} key={project.id} />;
                  })}
                </>
              )}
              {!hasItems && <p>No items found</p>}
            </>
          )}
        </div>
      )}
    </li>
  );
};

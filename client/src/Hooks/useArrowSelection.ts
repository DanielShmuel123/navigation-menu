import { useEffect, useState } from "react";
import { IProject } from "../data";
import { getFilteredItemsIds, getUrlForProjectsMap } from "../utils";

export const useArrowSelection = (filteredProjectData: IProject[], searchStr: string, showDropdown: boolean): number => {
  const filteredProjectDataIds = getFilteredItemsIds(filteredProjectData);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(0);
  }, [searchStr]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.keyCode === 38 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (e.keyCode === 40 && activeIndex < filteredProjectDataIds.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (e.keyCode === 13 && showDropdown) {
        const projectUrlMap = getUrlForProjectsMap(filteredProjectData);
        window.open(projectUrlMap[filteredProjectDataIds[activeIndex]], "_blank");
      }
    };
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [activeIndex, filteredProjectData, filteredProjectDataIds, showDropdown]);
  return filteredProjectDataIds[activeIndex];
};

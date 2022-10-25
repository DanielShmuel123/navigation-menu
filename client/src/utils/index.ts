import { IProject } from "../data";

const formatTermForSearching = (term: string): string => {
  return term.trim().toLowerCase();
};

const wordContainsSearchString = (word: string, searchStr: string) => {
  const res = formatTermForSearching(word).includes(formatTermForSearching(searchStr));
  return res;
};

export const getfilteredProjectData = (projectData: IProject[], searchStr: string): IProject[] => {
  if (searchStr === "") {
    return projectData;
  }
  let filteredProjectData = [];
  const menuDataCopy = [...projectData];
  for (const item of menuDataCopy) {
    const itemCopy = { ...item };
    const { name: projectName, groups } = itemCopy;
    const projectNameMatchesSearch = wordContainsSearchString(projectName, searchStr);
    const filteredGroups = groups.filter((group) => {
      return wordContainsSearchString(group.name, searchStr);
    });
    const shouldBeIncludedInfilteredResults = filteredGroups.length > 0 || projectNameMatchesSearch;
    if (shouldBeIncludedInfilteredResults) {
      itemCopy.groups = filteredGroups;
      filteredProjectData.push(itemCopy);
    }
  }
  return filteredProjectData;
};

export const findIndexesToHighlightInWord = (word: string, searchStr: string): { startHighlightingFrom: number; stopHighlightingFrom: number } => {
  const startHighlightingFrom = formatTermForSearching(word).indexOf(formatTermForSearching(searchStr));
  if (formatTermForSearching(searchStr) === "" || startHighlightingFrom === -1) {
    return { startHighlightingFrom: -1, stopHighlightingFrom: -1 };
  }
  const stopHighlightingFrom = startHighlightingFrom + searchStr.length - 1;
  return { startHighlightingFrom, stopHighlightingFrom };
};

export const getFilteredItemsIds = (projects: IProject[]): number[] => {
  const res = [];
  for (const project of projects) {
    res.push(project.id);
    for (const group of project.groups) {
      res.push(group.id);
    }
  }
  return res;
};

export const getUrlForProjectsMap = (projectData: IProject[]): { [key: string]: string } => {
  const res: { [key: string]: string } = {};
  projectData.reduce((acc: any, cur) => {
    acc[cur.id] = cur.url;
    for (const group of cur.groups) {
      acc[group.id] = group.url;
    }
    return acc;
  }, res);
  return res;
};

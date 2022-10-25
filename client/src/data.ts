export interface IProjecttGroup {
  id: number;
  name: string;
  url: string;
}

export interface IProject {
  id: number;
  name: string;
  image: { link: string };
  groups: IProjecttGroup[];
  url: string;
}

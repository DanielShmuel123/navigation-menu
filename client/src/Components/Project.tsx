import React from "react";
import { IProject } from "../data";
import { DisplayName } from "./DisplayName";

interface IProps extends IProject {
  searchString: string;
  activeId: number;
}

export const Project: React.FunctionComponent<IProps> = ({ groups, name, image: { link }, searchString, id, url, activeId }) => {
  return (
    <div className="project">
      <img src={link} width={30} height={30} className="project-image" alt="project" />
      <div className="project-group-container">
        <DisplayName name={name} searchString={searchString} isHeading={true} id={id} url={url} activeId={activeId} />
        {groups.map((group, index) => {
          return <DisplayName name={group.name} searchString={searchString} id={group.id} url={group.url} activeId={activeId} key={index} />;
        })}
        <p className="add-group-text">+ Add Group</p>
      </div>
    </div>
  );
};

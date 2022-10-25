import { navigationItems } from "../config";
import { NavItem } from "./NavItem";
export const Header = () => {
  return (
    <ul className="header">
      {navigationItems.map((item, index) => {
        return <NavItem projectDataUrl={item.url} title={item.title} key={index} />;
      })}
    </ul>
  );
};

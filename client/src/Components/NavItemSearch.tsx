interface IProps {
  handleSearch(str: string): void;
  searchString: string;
}

export const NavItemSearch: React.FunctionComponent<IProps> = ({ handleSearch, searchString }) => {
  return (
    <div className="navigation-item-search-bar-container">
      <span className="navigation-item-search-bar-icon">🔍</span>
      <input
        value={searchString}
        type="text"
        className="navigation-item-search-bar"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

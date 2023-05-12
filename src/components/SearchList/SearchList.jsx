import { SearchItem } from "../SearchItem/SearchItem";
import "./SearchList.css";

export const SearchList = (props) => {
  const {
    searchText,
    searchTextInLowerCase,
    filteredUsers,
    activeSuggestionIndex,
    activeSuggestionRef,
    mouseOverHandler,
  } = props;

  return (
    <>
      {searchText && (
        <ul className="search-list" onMouseOver={mouseOverHandler}>
          {filteredUsers.map((user, index) => (
            <SearchItem
              key={user.id}
              user={user}
              itemIndex={index}
              activeSuggestionIndex={activeSuggestionIndex}
              activeSuggestionRef={activeSuggestionRef}
              searchText={searchText}
              searchTextInLowerCase={searchTextInLowerCase}
            />
          ))}
          {filteredUsers.length === 0 && <li>No user found</li>}
        </ul>
      )}
    </>
  );
};

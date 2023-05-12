import { filterUserItems } from "../../helper/utils";
import "./SearchItem.css";

const getHighlightedText = (text, highlight) => {
  const parts = text?.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {parts?.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { color: "blue", fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};

export const SearchItem = (props) => {
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
            <li
              key={user.id}
              className={`search-item ${
                activeSuggestionIndex === index ? "active" : ""
              }`}
              ref={activeSuggestionIndex === index ? activeSuggestionRef : null}
            >
              <div>{user.id}</div>

              {filterUserItems(user, searchTextInLowerCase).length > 0 && (
                <div className="items-match">{`"${searchText}" found in items`}</div>
              )}

              <div>{getHighlightedText(user.name, searchTextInLowerCase)}</div>
              <div>
                {getHighlightedText(user.address, searchTextInLowerCase)}
              </div>
              <div>
                {getHighlightedText(user.pincode, searchTextInLowerCase)}
              </div>
              <div>{user.items.join(", ")}</div>
            </li>
          ))}
          {filteredUsers.length === 0 && <li>No user found</li>}
        </ul>
      )}
    </>
  );
};

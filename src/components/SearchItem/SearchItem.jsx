import { filterUserItems } from "../../helper/utils";

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
    user,
    activeSuggestionIndex,
    itemIndex,
    activeSuggestionRef,
    searchText,
    searchTextInLowerCase,
  } = props;

  return (
    <li
      className={`search-item ${
        activeSuggestionIndex === itemIndex ? "active" : ""
      }`}
      ref={activeSuggestionIndex === itemIndex ? activeSuggestionRef : null}
    >
      <div>{user.id}</div>

      {filterUserItems(user, searchTextInLowerCase).length > 0 && (
        <div className="items-match">{`"${searchText}" found in items`}</div>
      )}

      <div>{getHighlightedText(user.name, searchTextInLowerCase)}</div>
      <div>{getHighlightedText(user.address, searchTextInLowerCase)}</div>
      <div>{getHighlightedText(user.pincode, searchTextInLowerCase)}</div>
      <div>{user.items.join(", ")}</div>
    </li>
  );
};

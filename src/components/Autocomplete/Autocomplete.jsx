import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { filterUserItems } from "../../helper/utils";
import { SearchItem } from "../SearchItem/SearchItem";
import "./Autocomplete.css";

const Autocomplete = (props) => {
  const { users } = props;
  const [searchText, setSearchText] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const activeSuggestionRef = useRef(null);
  const hoverRef = useRef(-1);

  const searchInputHandler = (e) => {
    setSearchText(e.target.value);
    setActiveSuggestionIndex(-1);
  };

  const searchTextInLowerCase = searchText.toLowerCase();

  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTextInLowerCase) ||
      user.name.toLowerCase().includes(searchTextInLowerCase) ||
      user.address.toLowerCase().includes(searchTextInLowerCase) ||
      user.pincode.toLowerCase().includes(searchTextInLowerCase) ||
      filterUserItems(user, searchTextInLowerCase).length > 0
  );

  const keyDownHandler = (e) => {
    const keyCode = e.keyCode;

    let nextSuggestionIndex = activeSuggestionIndex;
    if (hoverRef.current >= 0 && nextSuggestionIndex === -1) {
      nextSuggestionIndex = hoverRef.current;
      hoverRef.current = -1;
    }

    flushSync(() => {
      if (keyCode === 40 && nextSuggestionIndex < filteredUsers.length - 1) {
        setActiveSuggestionIndex(nextSuggestionIndex + 1);
      } else if (keyCode === 38 && nextSuggestionIndex >= 0) {
        setActiveSuggestionIndex(nextSuggestionIndex - 1);
      }
    });

    if (activeSuggestionRef.current) {
      activeSuggestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const mouseOverHandler = (e) => {
    const searchItem = e.target.closest("li");

    if (!searchItem || !e.target.contains(searchItem)) {
      return;
    }

    const indexOfSearchItem = [...searchItem.parentElement.childNodes].indexOf(
      searchItem
    );

    hoverRef.current = indexOfSearchItem;
  };

  return (
    <div className="wrapper">
      <input
        type="search"
        value={searchText}
        onChange={searchInputHandler}
        onKeyDown={keyDownHandler}
        placeholder="Search users by ID, address, name"
        className="search-box"
      />
      <SearchItem
        searchText={searchText}
        searchTextInLowerCase={searchTextInLowerCase}
        filteredUsers={filteredUsers}
        activeSuggestionIndex={activeSuggestionIndex}
        activeSuggestionRef={activeSuggestionRef}
        mouseOverHandler={mouseOverHandler}
      />
    </div>
  );
};

export default Autocomplete;

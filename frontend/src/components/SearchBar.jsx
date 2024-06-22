import { useState } from "react";
import "./table.css";

const SearchBar = ({ searchTable }) => {
  const [searchValue, setSearchValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    searchTable(searchValue);
  };
  return (
    <div className="search-bar">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Search table"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button>🔍</button>
      </form>
    </div>
  );
};

export default SearchBar;

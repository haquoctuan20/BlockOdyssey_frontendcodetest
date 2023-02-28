import { useState } from "react";
import "./App.css";
import TableProducts from "./components/TableProducts";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value.trim());
  };

  return (
    <div className="container">
      <div className="container-input">
        <div>
          <span>Search: </span>
          <input type="text" onChange={handleSearch} />
        </div>
      </div>

      <TableProducts searchValue={searchValue} />
    </div>
  );
}

export default App;

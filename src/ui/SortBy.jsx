import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || ""; //get current sortby value from URL
  function handleChange(event) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams); //updates the URL with the new sortby value
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;

import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        filterOptions={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-Discount" },
          { value: "with-discount", label: "With-Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regular-price-asc",
            label: "Sort by regular price (Low First)",
          },
          {
            value: "regular-price-desc",
            label: "Sort by regular price (High First)",
          },
          {
            value: "max-capacity-asc",
            label: "Sort by max capacity (Low First)",
          },
          {
            value: "max-capacity-desc",
            label: "Sort by max capacity (High First)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

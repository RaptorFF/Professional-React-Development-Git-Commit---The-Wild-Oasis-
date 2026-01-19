import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  // Use custom hook to fetch cabins data
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // Show spinner while loading
  if (isLoading) return <Spinner />;

  const discountFilter = searchParams.get("discount") || "all"; // Get discount filter from URL params

  // Filter cabins based on discount filter
  const filteredCabins = cabins.filter((cabin) => {
    if (discountFilter === "with-discount") {
      return cabin.discount > 0;
    } else if (discountFilter === "no-discount") {
      return cabin.discount === 0;
    }
    return true; // "all" or no filter
  });

  //Sort cabins based on sortBy URL param
  const sortBy = searchParams.get("sortBy") || "name-asc";

  // Sort the filtered cabins array based on the selected sort option from URL params
  filteredCabins.sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "regular-price-asc":
        return a.regularPrice - b.regularPrice;
      case "regular-price-desc":
        return b.regularPrice - a.regularPrice;
      case "max-capacity-asc":
        return a.maxCapacity - b.maxCapacity;
      case "max-capacity-desc":
        return b.maxCapacity - a.maxCapacity;
      default:
        return 0;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>

        <Table.Body
          data={filteredCabins} //data prop to pass cabins array
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} //render prop to render each cabin row
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

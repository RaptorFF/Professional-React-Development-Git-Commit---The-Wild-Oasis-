import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILETRING
  const filterValue = searchParams.get("status"); // Default no filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"; // Default sort by startDate descending
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // React Query hook to fetch bookings data
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy], // Include filter and sortBy in query key to refetch on filter or sort change like dependency array in useEffect
    queryFn: () => getBookings({ filter, sortBy }), // Pass filter and sortBy to the API function
  });
  return { isLoading, bookings, error };
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

  // React Query hook to fetch bookings data
  const {
    isLoading,
    data: { data: bookings, count } = {}, // Destructure data and count from the returned data object
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Include filter and sortBy in query key to refetch on filter or sort change like dependency array in useEffect
    queryFn: () => getBookings({ filter, sortBy, page }), // Pass filter and sortBy to the API function
  });

  // PRE-FETCHING
  if (page < Math.ceil(count / ITEMS_PER_PAGE)) {
    // Only prefetch if there is a next page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    // Only prefetch if there is a previous page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, count, error };
}

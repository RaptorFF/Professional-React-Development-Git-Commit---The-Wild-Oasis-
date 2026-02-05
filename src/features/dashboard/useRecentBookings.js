import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? "7"
    : Number(searchParams.get("last"));

  // Calculate the date that is `numDays` ago from today with the `subDays` function from date-fns and convert it to ISO string format
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isPending, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}-days`],
  });
  return { isPending, bookings };
}

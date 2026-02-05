import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? "7"
    : Number(searchParams.get("last"));

  // Calculate the date that is `numDays` ago from today with the `subDays` function from date-fns and convert it to ISO string format
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isPending, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}-days`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );
  return { isPending, stays, confirmedStays, numDays };
}

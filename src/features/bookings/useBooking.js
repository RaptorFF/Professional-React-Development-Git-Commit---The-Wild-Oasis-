import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams(); // Get bookingId from route parameters
  // React Query hook to fetch booking data
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { isLoading, booking, error };
}

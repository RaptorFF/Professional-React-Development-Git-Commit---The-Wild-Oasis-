import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => {
      updateBooking(bookingId, { status: "checked-in", isPaid: true }); // Update status and isPaid in supabase
    },
    // data is the updated booking returned from the API
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully!`);
      queryClient.invalidateQueries({ active: true }); // Invalidate bookings list
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to check in the booking. Please try again.");
    },
  });
  return { checkin, isCheckingIn }; // Return the checkin function and loading state
}

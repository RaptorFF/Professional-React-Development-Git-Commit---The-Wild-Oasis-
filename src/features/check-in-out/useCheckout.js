import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      }); // Update booking status to 'checked-out' and mark as paid if breakfast is added
    },
    // data is the updated booking returned from the API
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully!`);
      queryClient.invalidateQueries({ active: true }); // Invalidate bookings list
    },
    onError: () => {
      toast.error("Failed to check out the booking. Please try again.");
    },
  });
  return { checkout, isCheckingOut }; // Return the checkout function and loading state
}

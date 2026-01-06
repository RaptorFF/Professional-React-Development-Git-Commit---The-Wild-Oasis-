import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate: editCabinMutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (data) => {
      toast.success("Cabin successfully updated:", data);
      // Invalidate and refetch cabins query to reflect the new cabin
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editCabinMutate, isEditing };
}

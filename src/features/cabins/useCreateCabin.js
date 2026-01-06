import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      toast.success("Cabin created:", data);
      // Invalidate and refetch cabins query to reflect the new cabin
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCabinMutate, isCreating };
}

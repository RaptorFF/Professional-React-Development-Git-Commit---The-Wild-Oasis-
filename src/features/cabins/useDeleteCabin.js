import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  // React Query hooks for mutation (deletion) and query client for invalidation
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");

      // Invalidate and refetch cabins data after deletion
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabinMutate };
}

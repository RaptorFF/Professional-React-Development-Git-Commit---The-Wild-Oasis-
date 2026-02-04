import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../services/apiAuth";

export function useUpdateUser() {
  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success("User account successfully updated:");
      // Invalidate the user query to refetch the updated user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}

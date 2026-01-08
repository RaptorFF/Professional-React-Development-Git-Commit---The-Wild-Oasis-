import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate: updateSettingsMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      toast.success("Settings successfully updated:", data);
      // Invalidate and refetch settings query to reflect the new settings
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateSettingsMutate, isUpdating };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear user data from the query cache
      queryClient.removeQueries();
      // Redirect to login page or perform other actions after logout
      navigate("/login", { replace: true }); // replace: true to prevent going back to protected page
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  return { logout, isPending };
}

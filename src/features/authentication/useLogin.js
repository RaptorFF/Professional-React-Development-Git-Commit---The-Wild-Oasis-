import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // user contains info about the logged-in user and came from the loginApi function
      //1. Store user data in the query cache
      queryClient.setQueryData(["user"], user.user);
      //2. Redirect to the dashboard
      navigate("/dashboard", { replace: true }); // replace: true to prevent going back to login page
    },
    onError: (err) => {
      console.log("Login failed:", err.message);
      toast.error("Provided email or password are incorrect.");
    },
  });
  return { login, isPending };
}

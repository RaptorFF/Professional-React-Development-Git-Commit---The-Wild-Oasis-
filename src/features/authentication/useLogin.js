import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // user contains info about the logged-in user
      console.log(user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Login failed:", err.message);
      toast.error("Provided email or password are incorrect.");
    },
  });
  return { login, isPending };
}

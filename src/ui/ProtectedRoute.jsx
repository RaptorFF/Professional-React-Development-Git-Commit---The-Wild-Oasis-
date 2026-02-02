import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authencated user
  const { user, isLoading, isAuthenticated } = useUser();
  //2. While loading, show a loading indicator
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  //3. If there is NO authenticated user, redirect to login
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  //4. If there is an authenticated user, return the children components
  return children;
}

export default ProtectedRoute;

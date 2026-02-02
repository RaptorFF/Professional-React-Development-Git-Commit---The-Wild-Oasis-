import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authencated user
  const { isLoading, isAuthenticated } = useUser();

  //2. If there is NO authenticated user, redirect to login
  //use useEffect to avoid redirect during render
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //3. While loading, show a loading indicator
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //4. If there is an authenticated user, return the children components
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;

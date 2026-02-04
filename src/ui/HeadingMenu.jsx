import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const StyledHeadingMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeadingMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeadingMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeadingMenu>
  );
}

export default HeadingMenu;

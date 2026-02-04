import styled from "styled-components";
import HeadingMenu from "./HeadingMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  // Flexbox to align items to the right
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeadingMenu />
    </StyledHeader>
  );
}

export default Header;

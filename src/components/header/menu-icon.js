import styled from '@emotion/styled';

const MenuIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${(p) => p.theme.size(2)};
  align-self: stretch;
  transition: right 0.3s ease-in-out;
  left: ${(p) => (p.isDrawerOpen ? p.theme.size(1) : `-${p.theme.size(4)}`)};
`;

export { MenuIcon as default };

import styled from '@emotion/styled';

const Navbar = styled.header`
  height: ${(p) => p.theme.size(4)};
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: ${(p) => p.theme.zIndex.header};
  top: 0;
  left: 0;
  padding-left: ${(p) => p.theme.size(0.5)};
  background: ${(p) => p.theme.palette.primary.main};
`;

export { Navbar as default };

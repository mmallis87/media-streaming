import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  z-index: ${(p) => p.theme.zIndex.overlay};
  top: 0;
  left: 0;
  background: black;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(p) => (p.isDrawerOpen ? 0.5 : 0)};
  pointer-events: ${(p) => (p.isDrawerOpen ? 'all' : 'none')};
`;

export { Overlay as default };

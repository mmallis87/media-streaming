import styled from '@emotion/styled';

const Paper = styled.aside`
  position: fixed;
  z-index: ${(p) => p.theme.zIndex.drawer};
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(p) => p.theme.size(16)};
  background: ${(p) => p.theme.palette.secondary.main};
  transition: transform 0.3s ease-in-out;
  transform: translateX(
    ${(p) => (p.isDrawerOpen ? 0 : `-${p.theme.size(16)}`)}
  );
`;

export { Paper as default };

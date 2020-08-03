import styled from '@emotion/styled';

const DrawerHeader = styled.header`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.size(4)};
  background: ${(p) => p.theme.palette.secondary.dark};
`;

export { DrawerHeader as default };

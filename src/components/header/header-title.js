import styled from '@emotion/styled';

const HeaderTitle = styled.h2`
  color: ${(p) => p.theme.palette.primary.contrast};
  padding-left: ${(p) => p.theme.size(5)};
  font-size: ${(p) => p.theme.size(1)};
  margin-bottom: 0;
  z-index: ${(p) => p.theme.zIndex.header + 10};
  white-space: nowrap;
  @media (min-width: 420px) {
    font-size: ${(p) => p.theme.size(2)};
  }
`;

export { HeaderTitle as default };

import styled from '@emotion/styled';

const Top = styled.div`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.size(4)};
  position: fixed;
  z-index: ${(p) => p.theme.zIndex.header + 25};
  top: 0;
  left: 0;
`;

export { Top as default };

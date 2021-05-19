import styled from '@emotion/styled';

const Content = styled.section`
  transition: transform 0.3s ease-in-out;
  transform: perspective(200px)
    ${(p) =>
      p.isDrawerOpen
        ? `translateX(${p.theme.size(8)}) translateZ(-20px)`
        : 'none'};
  padding-left: ${(p) => p.theme.size(1)};
  padding-right: ${(p) => p.theme.size(1)};
`;

export { Content as default };

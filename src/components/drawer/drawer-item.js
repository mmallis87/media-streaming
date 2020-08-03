import styled from '@emotion/styled';
import { Link } from 'gatsby';

const DrawerItem = styled(Link)`
  color: ${(p) => p.theme.palette.secondary.contrast};
  padding: ${(p) => p.theme.size(1)} ${(p) => p.theme.size(2)};
  transition: background-color 0.1s ease-out;
  &:hover {
    background: ${(p) => p.theme.palette.secondary.dark};
  }
  cursor: pointer;
`;

export { DrawerItem as default };

import styled from '@emotion/styled';

const Hamburger = styled.span`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.isDrawerOpen ? 'scale(0.7)' : 'scale(0.9)')};
`;

export { Hamburger as default };

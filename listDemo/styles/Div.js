import styled from 'styled-components';

const Div = styled.div`
  bottom: 0.15em;
  color: #F08080;
  font-weight: 200;
  opacity: 0;
  position: absolute;
  right: 2em;
  transition: 'opacity 150ms ease-in';
  li:hover > & {
    opacity: 1;
  }
`;

export default Div;

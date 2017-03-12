import styled, {keyframes} from 'styled-components';

function rotationBuilder(degree) {
  const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-${degree}deg);
    }
    50% {
      transform: rotate(0deg);
      opacity: .9
    }
    75% {
      transform: rotate(${degree}deg);
    }
  `;
  return rotation;
}

const Input = styled.input`
  animation: ${rotationBuilder(5)} 0.2s linear 2;
  border: 1px solid #fafafa;
  border-radius: 5px;
  color: slategrey;
  font-size: 1em;
  letter-spacing: 0.5px;
  outline: none;
  padding: 0.5em 0.5em 0.5em 2em;
  width: 350px;
  &::-webkit-input-placeholder {
    font-style: italic;
  }
`;

export default Input;

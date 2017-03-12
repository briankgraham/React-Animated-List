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
  outline: none;
  color: slategrey;
  border-radius: 5px;
  font-size: 1em;
  letter-spacing: 0.5px;
  border: 1px solid #fafafa;
  width: 350px;
  padding: 0.5em 0.5em 0.5em 2em;
  &::-webkit-input-placeholder {
    font-style: italic;
  }
`;

export default Input;

import { StyledButton, StyledSpan } from "./styles";

export default function Button(props) {
  return (
    <StyledButton onClick={props.onClick}>
      <StyledSpan>{props.text}</StyledSpan>
    </StyledButton>
  );
}

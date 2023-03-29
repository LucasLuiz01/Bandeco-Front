import { StyledInput } from "./styles";

export default function Input(props) {
    return <StyledInput onChange={props.onChange} value={props.value} required placeholder={props.placeholder} type={props.type} />;
}
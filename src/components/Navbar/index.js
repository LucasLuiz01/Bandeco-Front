import { StyledNavbar } from "./styles"
export default function Navbar (props){
    return <StyledNavbar ><span>{props.text}</span><h1>{props.h1}</h1></StyledNavbar>
}
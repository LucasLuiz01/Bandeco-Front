import styled from "styled-components"

export default function Logo(props) {
    return <Titulo>Bandeco</Titulo>
}

const Titulo = styled.h1`
font-family: "Lexend Deca";
font-size: 3rem;
font-weight: bold;
text-align: center;
color: #333;
text-shadow: 2px 2px 0px #fff, 3px 3px 0px rgba(0, 0, 0, 0.1);
letter-spacing: 2px;
margin-top: 2rem;
margin-bottom: 2rem;
`
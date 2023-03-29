import { Link } from "react-router-dom";
import { Button, Column, Input, Logo, Links, Padding } from "../../components";
import { useState } from "react";
import { BASE_URL } from "../../constants/url.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const [ra, setRa] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const url = `${BASE_URL}/sign-in` 
  function cadastro(e) {
    console.log(ra, senha, nome, 'dADOS')
    e.preventDefault();
   const promisse = axios.post(url,{
    ra: `${ra}`,
      name: `${nome}`,
      password: `${senha}`,
    })
    promisse.then((resposta)=> {
      console.log(resposta,"Sucesso")
      console.log("sucesso", resposta)
      navigate("/")
    })
    promisse.catch((err)=> {
      alert(err.response.data)
      console.log(err.response)
    })
  }
  return (
    <Column>
      <Padding size="huge" />
      <Logo width={"180px"} height={"178.38px"} />
      <Padding size="big" />
      <form onSubmit={cadastro}>
        <Input
          placeholder="ra"
          type="number"
          value={ra}
          onChange={(e) => setRa(e.target.value)}
        />
        <Padding />
        <Input
          placeholder="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Padding />
        <Input
          placeholder="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Padding />
        <Padding />
        <Button type="submit" text="Cadastrar" />
      </form>
      <Padding size="big" />
      <Link to="/">
        <Links text="Já tem uma conta? Faça login!" />
      </Link>
    </Column>
  );
}


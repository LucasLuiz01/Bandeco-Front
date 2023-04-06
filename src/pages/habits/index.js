import Navbar from "../../components/Navbar";
import { Padding, Footer, NenhumMenu, TextHH } from "../../components";
import { BASE_URL } from "../../constants/url";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Context from "../Context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Habits() {
  const { login, setNome } = useContext(Context);
  const localStorage = window.localStorage;
  const storedToken = localStorage.getItem("token");
  console.log(login, "DADOS AQUI");
  console.log("token", login);
  const [userCount, setUserCount] = useState({});
  const [userMenu, setUserMenu] = useState({});
  useEffect(() => {
    const url = `${BASE_URL}/userCount`;
    const promisse = axios.get(url, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    promisse.then((sucess) => {
      setUserCount(sucess.data);
      localStorage.setItem('userInfo', JSON.stringify(sucess.data));
    });
    promisse.catch((err) => {
      console.log("Error", err.response.data);
    });
  }, [userMenu]);

  console.log("login", login);

  function add(dia) {
    console.log(dia);
    const urls = `${BASE_URL}/menu/${dia}`;
    console.log(urls, "AQQQUI");
    const promisse = axios.get(urls);
    promisse.then((sucess) => {
      setUserMenu(sucess.data);
      console.log(sucess.data);
    });
    promisse.catch((err) => {
      setUserMenu({});
      console.log("Error", err.response.data);
    });
  }
  if (userMenu.length !== undefined) {
    const almocoVeg = userMenu.find(
      (objeto) => objeto.isVeg === true && objeto.isDinner === false
    );
    console.log(almocoVeg);
    const almoco = userMenu.find(
      (objeto) => objeto.isVeg === false && objeto.isDinner === false
    );
    const jantar = userMenu.find(
      (objeto) => objeto.isVeg === false && objeto.isDinner === true
    );
    const jantarVeg = userMenu.find(
      (objeto) => objeto.isVeg === true && objeto.isDinner === true
    );
    return (
      <div style={{ background: "#E5E5E5", height: "100%" }}>
        <Navbar text={"Bandeco"} h1={`${userMenu[0].date} `}/>
        <Padding size={"huge"} />
        <StyledAdd>
        <button onClick={() => add("Segunda")}>Segunda</button>{" "}
          <button onClick={() => add("Terça")}>Terça</button>{" "}
          <button onClick={() => add("Quarta")}>Quarta</button>{" "}
          <button onClick={() => add("Quinta")}>Quinta</button>{" "}
          <button onClick={() => add("Sexta")}>Sexta</button>{" "}
        </StyledAdd>
        <Centralizar>
          <StyledMenu>
            <StyledDay>
              <h1>ALMOCO</h1>
              <h2>Proteina : {almoco.protein}</h2>
              <p>ARROZ E FEIJÃO</p>
              <p>Complemento : {almoco.complement}</p>
              <p>Salada : {almoco.salad}</p>
              <p>Sobremesa : {almoco.dessert}</p>
              <p>Suco : {almoco.juice}</p>
              <p>Observações: : {almoco.comments}</p>
            </StyledDay>
            <StyledDay>
              <h1>ALMOCO-VEGANO</h1>
              <h2>Proteina : {almocoVeg.protein}</h2>
              <p>ARROZ E FEIJÃO</p>
              <p>Complemento : {almocoVeg.complement}</p>
              <p>Salada : {almocoVeg.salad}</p>
              <p>Sobremesa : {almocoVeg.dessert}</p>
              <p>Suco : {almocoVeg.juice}</p>

              <p>Observações: : {almocoVeg.comments}</p>
            </StyledDay>
          </StyledMenu>
        </Centralizar>
        <Centralizar>
   <StyledMenu>
     <StyledDay>
       <h1>JANTAR</h1>
       <h2>Proteina : {jantar.protein}</h2>
       <p>ARROZ E FEIJÃO</p>
       <p>Complemento : {jantar.complement}</p>
       <p>Salada : {jantar.salad}</p>
       <p>Sobremesa : {jantar.dessert}</p>
       <p>Suco : {jantar.juice}</p>
       <p>Observações: : {jantar.comments}</p>
     </StyledDay>
     <StyledDay>
       <h1>JANTAR-VEGANO</h1>
       <h2>Proteina : {jantarVeg.protein}</h2>
       <p>ARROZ E FEIJÃO</p>
       <p>Complemento : {jantarVeg.complement}</p>
       <p>Salada : {jantarVeg.salad}</p>
       <p>Sobremesa : {jantarVeg.dessert}</p>
       <p>Suco : {jantarVeg.juice}</p>
       <p>Observações: : {jantarVeg.comments}</p>
     </StyledDay>
   </StyledMenu>
 </Centralizar>
 <div style={ {height:130}}>
        <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={userCount.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={`R$ ${userCount.balance},00`} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/historico'>
            <TextHH text={"Adicionar saldo"} />
            </StyledLink>
          </div>
        </Footer>
        </div>
      </div>
    );
  }
  if (!userCount.userId) {
    return (
      <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <Navbar text={"Bandeco"} />
        <Padding size={"huge"} />
        <StyledAdd>
        <button onClick={() => add("Segunda")}>Segunda</button>{" "}
          <button onClick={() => add("Terça")}>Terça</button>{" "}
          <button onClick={() => add("Quarta")}>Quarta</button>{" "}
          <button onClick={() => add("Quinta")}>Quinta</button>{" "}
          <button onClick={() => add("Sexta")}>Sexta</button>{" "}
        </StyledAdd>

        <NenhumMenu />

        <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={"user"} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={"R$:00,00"} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/historico'>
            <TextHH text={"Adicionar saldo"} />
            </StyledLink>
          </div>
        </Footer>
      </div>
    );
  } else {
    return (
      <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <Navbar text={"Bandeco"} />
        <Padding size={"huge"} />
        <StyledAdd>
          <button onClick={() => add("Segunda")}>Segunda</button>{" "}
          <button onClick={() => add("Terça")}>Terça</button>{" "}
          <button onClick={() => add("Quarta")}>Quarta</button>{" "}
          <button onClick={() => add("Quinta")}>Quinta</button>{" "}
          <button onClick={() => add("Sexta")}>Sexta</button>{" "}
        </StyledAdd>

        <NenhumMenu />

        <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={userCount.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={`R$ ${userCount.balance},00`} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/historico'>
            <TextHH text={"Adicionar saldo"} />
            </StyledLink>
          </div>
        </Footer>
      </div>
    );
  }
}
const Centralizar = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledMenu = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const StyledDay = styled.div`
  width: 50%;
  height: 100%;
  h1 {
    text-align: center;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    color: black;
  }
  h2 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 600;
    font-size: 18.976px;
    line-height: 29px;
    color: black;
  }
  p {
    max-width: 400px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 18.976px;
    line-height: 29px;
    color: black;
  }
`;
const StyledBox = styled.div`
  width: 340px;
  height: 180px;
  background: #ffffff;
  border-radius: 5px;
  margin: auto;
  display: ${(props) => props.display};
`;
const StyledAdd = styled.div`
  height: 85px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  span {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 18.976px;
    line-height: 29px;
    color: #126ba5;
    margin-left: 18px;
  }
  button {
    display: inline-block;
  padding: 12px 24px;
  border-radius: 50px;
  font-family: "Lexend Deca";
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  background-color: #1A237E;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;

  }
  
`;
const StyledInput = styled.input`
  height: 45px;
  width: 292px;
  border-radius: 5px;
  color: #d4d4d4;
  border: 1px solid #d4d4d4;
  background-color: #ffffff;
  padding: 0px;
  padding-left: 11px;
  margin-left: 17px;

  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

    color: #dbdbdb;
  }
`;
const InputCheck = styled.div`
  width: 30px;
  height: 30px;
  background: ${(props) => props.background};
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  text-align: center;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: ${(props) => props.color};
  margin-left: 4px;
`;
const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: inherit;

  &:hover:before {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #126ba5;
    transform: translateY(-50%);
  }
`;
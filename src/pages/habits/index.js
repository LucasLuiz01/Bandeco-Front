import Navbar from "../../components/Navbar";
import { Padding, Footer, NenhumMenu, TextHH } from "../../components";
import { BASE_URL } from "../../constants/url";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Context from "../Context";
import { useContext, useEffect } from "react";
export default function Habits() {
  const { login } = useContext(Context);
  const storedToken = localStorage.getItem('token');
  console.log(login, "DADOS AQUI")
  console.log("token", login)
  const [userCount, setUserCount] = useState({});
  const [menu, setUserMenu] = useState({});
  useEffect(()=>{
    const url = `${BASE_URL}/userCount`
    const promisse = axios.get(url, {
      headers:{
        Authorization: `Bearer ${storedToken}`
      }
    }) 
    promisse.then((sucess)=> {
      setUserCount((sucess.data))
    })
    promisse.catch((err)=> {
      console.log("Error", err.response.data)
    })

  }, [])

  console.log("login", login);

  function add(dia) {
    console.log(dia)
    const urls = `${BASE_URL}/menu/${dia}`;
    console.log(urls,"AQQQUI")
    const promisse = axios.get(urls)
    promisse.then((sucess)=> {
      setUserMenu((sucess.data))
      console.log(sucess.data)
    })
    promisse.catch((err)=> {
      console.log("Error", err.response.data)
    })
  }
  if(!userCount.userId){
    return (
      <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <Navbar
          text={"Bandeco"}
        />
        <Padding size={"huge"} />
        <StyledAdd>
           <button onClick={add}>segunda-feira</button>{" "}
           <button onClick={add}>terca-feira</button>{" "}
           <button onClick={add}>quarta-feira</button>{" "}
           <button onClick={add}>quinta-feira</button>{" "}
           <button onClick={add}>sexta-feira</button>{" "}
        </StyledAdd>  
        
        <NenhumMenu />
        
        <Footer>
          <TextHH text={"user"} />
          <div
            style={{ width: 91, height: 91, position: "fixed", bottom: "10px" }}
          >
          </div>
          <TextHH />
          <TextHH text={"R$:00,00"} />
          <TextHH text={"Adicionar saldo"} />
        </Footer>
      </div>
    );
  }else{
    return (
      <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <Navbar
          text={"Bandeco"}
        />
        <Padding size={"huge"} />
        <StyledAdd>
           <button onClick={() => add('Segunda-Feira')}>Segunda-Feira</button>{" "}
           <button onClick={() => add('Terca-Feira')}>Terca-Feira</button>{" "}
           <button onClick={() => add('Quarta-Feira')}>Quarta-Feira</button>{" "}
           <button onClick={() => add('Quinta-feira')}>Quinta-feira</button>{" "}
           <button onClick={() => add('Sexta-Feira')}>Sexta-Feira</button>{" "}
        </StyledAdd>  
        
        <NenhumMenu />
        
        <Footer>
          <TextHH text={userCount.User.name} />
          <div
            style={{ width: 91, height: 91, position: "fixed", bottom: "10px" }}
          >
          </div>
          <TextHH />
          <TextHH text={`R$ ${userCount.balance},00`} />
          <TextHH text={"Adicionar saldo"} />
        </Footer>
      </div>
    );
  }

}
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
    margin-right: 18px;
    width: auto;
    height: auto;
    background: #52b6ff;
    border-radius: 4.63636px;
    font-family: "Lexend Deca";
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    color: #ffffff;
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
const Dias = styled.div`
  display: flex;
  margin-left: 13px;
  margin-top: 8px;
`;
const Cancelar = styled.div`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  text-align: center;
  color: #52b6ff;
  margin-right: 23px;
`;
const Confirma = styled.button`
  width: 84px;
  height: 35px;
  background: #52b6ff;
  border-radius: 4.63636px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;
const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-top: 26px;
`;
const Aparecer = styled.div`
display: "none";
`
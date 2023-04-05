import Navbar from "../../components/Navbar";
import { Padding, Footer, NenhumMenu, TextHH } from "../../components";
import { BASE_URL } from "../../constants/url";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from 'react';
import Context from "../Context";

export default function Historic (){
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [focus, setFocus] = React.useState('');
  const [saldo, setSaldo] = React.useState(0);
  const { login,nome } = useContext(Context);
  console.log("NOME", nome);
  const [balance, setBalance] = useState(0);
  const [newBalance, setNewBalance] = useState(0);

  const handleBalanceChange = (event) => {
    setNewBalance(event.target.value);
  };

  const handleAddBalance = () => {
    setBalance((prevBalance) => prevBalance + parseInt(newBalance));
    setNewBalance(0);
  };

  function submit(e){
console.log("oi")
  }

  if(saldo!== 0){
    return (
        <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <Navbar text={"Bandeco"} />
        <Padding size={"huge"} />
    
        <CreditCardContainer>
        <div className='creditCardInfo'>
            
          <div>
            <Cards cvc = { cvv } expiry = { cardExpiry } focused = { focus } name = { cardName } number = { cardNumber } />
          </div>

          <div className='form'>

            <div>
              <input type='tel' name='number' maxLength={16} value = { cardNumber } placeholder = 'Card Number' onChange = { e => setCardNumber(e.target.value.replace(/[A-Ça-ç!-/ ]/g, ''))} onFocus = { e => setFocus(e.target.name) }/> 
              <input type='tel' name='name' maxLength={37} value = { cardName } placeholder = 'Name' onChange = { e => setCardName(e.target.value.replace(/[A-Z0-9!-=]/, ''))} onFocus = { e => setFocus(e.target.name) }/> 
            </div>

            <div className='lowInputs' >
              <input className='validInput' type='tel' name='expiry' maxLength={4} value = { cardExpiry } placeholder = 'Valid Thru' onChange = { e => setCardExpiry(e.target.value.replace(/[A-Ça-ç!-/ ]/g, ''))} onFocus = { e => setFocus(e.target.name) }/> 
              <input className='cvvInput' maxLength={3} type='tel' name='cvc' value = { cvv } placeholder = 'CVC' onChange = { e => setCvv(e.target.value.replace(/[A-Ça-ç!-/ ]/g, ''))} onFocus = { e => setFocus(e.target.name) }/> 
            </div>

          </div>

        </div>

      </CreditCardContainer>
      <Button onClick={submit}>FINALIZAR PAGAMENTO</Button>

        <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={nome.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={"R$ 00,00"} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/habitos'>
            <TextHH text={"Voltar Menu"} />
            </StyledLink>
          </div>
        </Footer>
      </div>
    )
  }else{
    return(  <div style={{ background: "#E5E5E5", height: "100vh" }}>
    <Navbar text={"Bandeco"} />
    <Padding size={"huge"} />
    <Container>
      <Text>Seu saldo atual: R${balance.toFixed(2)}</Text>
      <Input
        type="number"
        min="0" step="1"
        
        placeholder="Digite o valor a ser adicionado"
        value={newBalance}
        onChange={handleBalanceChange}
      />
      <Buttons onClick={handleAddBalance}>Adicionar saldo</Buttons>
      <Text>Seu novo saldo: R${(balance + parseInt(newBalance)).toFixed(2)}</Text>
    </Container>
    <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={nome.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={"R$ 00,00"} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/habitos'>
            <TextHH text={"Voltar Menu"} />
            </StyledLink>
          </div>
        </Footer>
      </div>
    )
  }
   
}

const CreditCardContainer = styled.div`
  width:100%;
  margin: 30px 0 0 0;
  
  .creditCardInfo {
    width:710px;
    display:flex;
    align-items:center;
    justify-content:space-between;
  margin: 15px 0 0 0;
  }
  .form {
    .lowInputs {
      display:flex;
      justify-content:space-between;
    }

    div {
      width:370px;
      input {
        width: 100%;
        height:50px;
        border: 1px solid #666666;
        border-radius:6px;
        padding:10px;
        font-size:20px;
        margin:7px 0 7px 0;
      }
      .validInput {
        width:200px;
      }
      .cvvInput {
        width:150px;
      }
    }
  }
`;

const Button = styled.button`
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    padding: 15px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25 );
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
`;

const Buttons = styled.button`
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 18px;
`;
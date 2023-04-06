import Navbar from "../../components/Navbar";
import { Padding, Footer, TextHH } from "../../components";
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
import Modal from 'react-modal';
import { BASE_URL } from "../../constants/url";

export default function Payment (){
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [focus, setFocus] = React.useState('');
  const userCount = JSON.parse(localStorage.getItem("userInfo"));
  const storedToken = localStorage.getItem("token");
  const { login,nome } = useContext(Context);
  console.log("User", userCount);
  const [balance, setBalance] = useState(userCount.balance);
  const [valueToAdd, setValueToAdd] = useState('');
  const navigate = useNavigate();
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showCard, setShowCard]= useState(false)
  const validation = cardNumber.length === 16 && cardName.length >= 3 && cardExpiry.length === 4 && cvv.length === 3;
  const handleAddToWallet = (event) => {
    event.preventDefault();
    if (valueToAdd <= 0) {
      alert("Insira um valor válido para continuar.");
      return;
    }
    setShowSummaryModal(true);
  };

  const handleValueChange = (event) => {
    setValueToAdd(event.target.value);
  };

  const handlePaymentContinue = () => {
   // setBalance(balance + parseInt(valueToAdd));
    setShowSummaryModal(false);
    setShowCard(true)
  };

  const handlePaymentBack = () => {
    setShowSummaryModal(false);
    setValueToAdd('');
  };
  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  };
  const data = {
    id: userCount.id,
    balance: parseInt(valueToAdd),
  };
  function submit(){
    if(validation){
      const url = `${BASE_URL}/userCount`;
    const promisse = axios.put(url,data,config);
    promisse.then((sucess) => {
      setValueToAdd('');
      navigate("/menu")
    });
    promisse.catch((err) => {
      console.log("Error", err.response.data);
    });
    }else{
      alert("Prencha os dados corretamente")
    }
  }

  if(showCard=== true){
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
      <Centralizar><Button onClick={submit}>FINALIZAR PAGAMENTO</Button></Centralizar>
      

        <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={userCount.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={`R$ ${userCount.balance},00`} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/menu'>
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
    <WalletContainer>
  <h2>Seu saldo atual é de R$ {balance}</h2>
  <AddToWalletFormContainer onSubmit={handleAddToWallet}>
    <Label>
      Valor:
      <Input type="number" value={valueToAdd} onChange={handleValueChange} />
    </Label>
    <Button type="submit">Continuar</Button>
  </AddToWalletFormContainer>
  <PaymentSummaryModalContainer
    isOpen={showSummaryModal}
    onRequestClose={() => setShowSummaryModal(false)}
  >
    <PaymentSummaryModalContent>
      <PaymentSummaryLabel>Resumo do Pedido</PaymentSummaryLabel>
      <PaymentSummaryValue>Valor: R$ {valueToAdd}</PaymentSummaryValue>
      <PaymentSummaryValue>Seu novo saldo será de R$ {balance + parseInt(valueToAdd)}</PaymentSummaryValue>
      <PaymentSummaryValue>Forma de pagamento: Cartão de Crédito</PaymentSummaryValue>
      <PaymentSummaryButtonContainer>
        <Button onClick={handlePaymentContinue}>Continuar</Button>
        <Button onClick={handlePaymentBack}>Voltar</Button>
      </PaymentSummaryButtonContainer>
    </PaymentSummaryModalContent>
  </PaymentSummaryModalContainer>
</WalletContainer>
    <Footer>
          <div style={{ width: 136 }}>
            <TextHH text={userCount.User.name} />
          </div>
          <div style={{ width: 136 }}>
            <TextHH text={`R$ ${userCount.balance},00`} />
          </div>
          <div style={{ width: 136 }}>
          <StyledLink to='/menu'>
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
 display: flex;
 justify-content: center;
  
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
const Centralizar = styled.div`
display: flex;
justify-content: center;
`

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
const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:50px;
  h2{
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 29px;
    color: black;
  }
`;

const AddToWalletFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 29px;
    color: black;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Buttons = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const PaymentSummaryModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PaymentSummaryModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaymentSummaryLabel = styled.h2`
  margin-bottom: 1rem;
  font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 600;
    font-size: 18.976px;
    line-height: 29px;
    color: black;
`;

const PaymentSummaryValue = styled.p`
  margin: 0.5rem 0;
  font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 600;
    font-size: 18.976px;
    line-height: 29px;
    color: black;
`;

const PaymentSummaryButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

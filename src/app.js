import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./assets/globalStyle";
import { Menu, Payment, Registration, Login } from "./pages";
import Context from "./pages/Context";

export default function App() {
  const[login, setLogin] = useState()
  const[nome, setNome] = useState()
  const contextExport = {login, setLogin,}
  return (
    <>
    <Context.Provider value={{login, setLogin, nome, setNome }} >
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/menu"  element={<Menu />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
    </Context.Provider>
    </>
  );
}

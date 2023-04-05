import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./assets/globalStyle";
import { Habits, Historic, Today, Registration, Login } from "./pages";
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
        <Route path="/cadastro" element={<Registration />} />
        <Route path="/habitos"  element={<Habits />} />
        <Route path="/hoje" element={<Today />} />
        <Route path="/historico" element={<Historic />} />
      </Routes>
    </BrowserRouter>
    </Context.Provider>
    </>
  );
}

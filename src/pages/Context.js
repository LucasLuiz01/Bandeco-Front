import React, { createContext } from 'react';

const Context = createContext({
    login: null,
    setLogin: () => {},
    nome: null,
    setNome: () => {}

});

export default Context;
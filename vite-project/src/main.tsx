import React from 'react'
import ReactDoom from 'react-dom/client'
import Calculadora_Matrices from './Calcculadora_Matrices'
//import Calculadora from './Calculadora.tsx'


ReactDoom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Calculadora_Matrices />
  </React.StrictMode>,
)
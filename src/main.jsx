import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { CartContextProvider } from './Context/CartContext.jsx'
import { theme } from './theme/theme.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <CartContextProvider>
      <App />
      </CartContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
  </BrowserRouter>,
)

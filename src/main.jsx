import * as React from 'react'
import { ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App'

const fonts = {
  body: 'Montserrat',
  heading: 'Playfair Display'
}

const config = defineConfig({
  theme: {
    tokens: {
      //colors: {},
      fonts: {
        heading: `'Playfair Display', sans-serif`,
        body: `'Montserrat', sans-serif`,
      }
    },
  },
})

const system = createSystem(defaultConfig, config)

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
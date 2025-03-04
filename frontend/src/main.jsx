import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PlacesContextProvider } from './context/PlacesContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlacesContextProvider>
      <App />
    </PlacesContextProvider>
  </StrictMode>,
)

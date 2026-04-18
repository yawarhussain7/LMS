import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ClerkProvider } from '@clerk/react'

const Published_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!Published_key) {
  throw new Error("Clerk publishable key is missing. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.")
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={Published_key} afterSignOutUrl="/">
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
)


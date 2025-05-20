
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { SupabaseProvider } from './context/SupabaseContext.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { Toaster } from './components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/antlia">
      <SupabaseProvider>
        <AuthProvider>
          <DataProvider>
            <App />
            <Toaster />
          </DataProvider>
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

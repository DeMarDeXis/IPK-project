import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// TODO: make scrolling for invoice's table or change height of invoice's table
// TODO: lazy load images: what is it?
// TODO: info json data. Think about it

// TODO-list(pages):
//  MainPage.tsx => remake value json to file json(fetch from API or json think it)^
//  modal_wndw.tsx => fetch from API
//  StaffDieselPage.tsx => fetch from API
//  CapRepair.tsx => fetch from API
//  RepairHH.tsx => fetch from API
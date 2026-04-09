import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// TODO: info json data. Think about it

// TODO-list(pages):
//  MainPage.tsx => remake value json to file json(fetch from API or json think it)^
//  modal_wndw.tsx => fetch from API
//  StaffDieselPage.tsx => fetch from API
//  MajorRepair.tsx => fetch from API
//  RepairHAPage.tsx => fetch from API

// TODO:
//  DELETE code MainPage.module.css
//  Переместить кнопку в PrivateDieselProds
//  MajorRepair devide all components
//      later fix modal_window(MajorRepair, RepairHA)
//      also modal window should be moved in general_components
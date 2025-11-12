import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import './index.css'
import Header from './Components/Header'
import Home from './Views/Home'
import Footer from './Components/Footer'
import SidePanel from './Components/SidePanel'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex flex-col h-screen">
      <Header />

      <div className='flex grow flex-row'>
        <SidePanel />
        <Home/>
      </div>
      
      <Footer />
    </div>
  </StrictMode>
);
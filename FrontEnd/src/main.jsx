import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Components/Header'
import Home from './Views/Home'
import Footer from './Components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex flex-col h-screen">
      <Header />

      <div className='flex grow'>
        <Home/>
      </div>
      
      <Footer />
    </div>
  </StrictMode>
);
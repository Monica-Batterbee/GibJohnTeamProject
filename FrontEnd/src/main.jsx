import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import './index.css'
import Header from './Components/Header'
import Home from './Views/Home'
import Footer from './Components/Footer'
import SidePanel from './Components/SidePanel'
import Assignments from './Views/Assignments'
import SignUp from './Components/LoginPage'

function Main() {
  const [currentPage, setPage] = useState('Home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [role, setRole] = useState('');

  const pages = {
    'Home': Home,
    'Assignments': Assignments
  };

  let CurrentPageComponent = pages[currentPage];

  if (loggedIn) {
    console.log("found User",currentUser);
    console.log("role",role);
  return (
    
    <div className="flex flex-col h-screen">
      
      <Header name={currentUser.fname +' '+ currentUser.sname}/>

      <div className="flex grow flex-row">
 
        <SidePanel setPage={setPage} />
        <CurrentPageComponent currentUser={currentUser} role={role}/>

      </div>

      <Footer />
    </div>

  );
  }

  else {
    return (
    <SignUp setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} setRole={setRole}/>
    );
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

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
import Chat from './Views/Chat'
import Feedback from './Views/Feedback'
import Games from './Views/Games'
import Notes from './Views/Notes'
import Progress from './Views/Progress'
import Rewards from './Views/Rewards'


function Main() {
  const [currentPage, setPage] = useState('Home');
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({teacherID: 1, fname: 'test', sname: '1', email: 'test@email', password: 'hello'});
  const [role, setRole] = useState('Teacher');


  const pages = {
    'Home': Home,
    'Assignments': Assignments,
    'Feedback' : Feedback,
    'Rewards' : Rewards,
    'Notes' : Notes,
    'Games' : Games,
    'Progress' : Progress,
    'Chat' : Chat
  };


  let CurrentPageComponent = pages[currentPage];



    return (
      <>
      {!loggedIn && <SignUp setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} setRole={setRole}/>}
      {loggedIn &&     <div className="flex flex-col h-screen">
      
      <Header name={currentUser.fname +' '+ currentUser.sname}/>

      <div className="flex grow flex-row">
 
        <SidePanel setPage={setPage} />
        <CurrentPageComponent currentUser={currentUser} role={role}/>

      </div>

      <Footer />
    </div>}
      </>
    );
  }


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

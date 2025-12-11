import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import './index.css'
import Header from './Components/Header'
import StudentHome from './Views/StudentHome'
import Footer from './Components/Footer'
import SidePanel from './Components/SidePanel'
import Assignments from './Views/Assignments'
import SignUp from './Components/LoginPage'
import Games from './Views/Games'
import Notes from './Views/Notes'
import Tracker from './Views/Progress'
import Rewards from './Views/Rewards'
import Modal from  './Components/Modal'


function Main() {
 
  const [loggedIn, setLoggedIn] = useState(true);
  // const [currentUser, setCurrentUser] = useState({});
  const [currentUser, setCurrentUser] = useState({studentID: 1, fname: 'test', sname: '1', email: 'test@email', password: 'hello'});
  const [role, setRole] = useState('Student');
  const [currentPage, setPage] = useState(role === 'Student' ? 'StudentHome' : 'TeacherHome');
  const [openModal, setModal] = useState([false,'']);



  const pages = {
    'StudentHome': StudentHome,
    'Assignments': Assignments,
    'Rewards' : Rewards,
    'Notes' : Notes,
    'Games' : Games,
    'Progress' : Tracker,
  };


  let CurrentPageComponent = pages[currentPage];



    return (
      <>
      {!loggedIn && <SignUp setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} setRole={setRole}/>}
      {loggedIn &&     <div className="flex flex-col h-screen">
      
      <Header name={currentUser.fname +' '+ currentUser.sname} role={role} setModal={setModal}/>

      {openModal[0] === true && <Modal setModal={setModal} modal={openModal} currentUser={currentUser}/>}

      <div className="flex grow flex-row bg-gray-50">
 
        <SidePanel setPage={setPage} />
        <CurrentPageComponent currentUser={currentUser} role={role} setModal={setModal}/>

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

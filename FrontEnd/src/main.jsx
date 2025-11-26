// import { StrictMode, useState } from 'react'
// import { createRoot } from 'react-dom/client'
// import 'react-tooltip/dist/react-tooltip.css'
// import './index.css'
// import Header from './Components/Header'
// import Home from './Views/Home'
// import Footer from './Components/Footer'
// import SidePanel from './Components/SidePanel'
// // <<<<<<< HEAD
// import Assingnments from './Views/Assignments'

// // =======
// // import SignIn from './Compontnets/SignUpPage'
// // >>>>>>> 6a0c8173963b4cd953cb5f587e0e9e34017945af


// function Main() {
//   const [currentPage, setPage] = useState('Home');

//   const pages = {
//     Home: Home,
//     Assingnments: Assingnments
//     // add more pages here
//   };

//   const CurrentPageComponent = pages[currentPage] || Home;

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />

//       <div className="flex grow flex-row">
//         <SidePanel setPage={setPage} />
//         <CurrentPageComponent />
//       </div>

//       <Footer />
//     </div>
//   );
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Main />
//   </StrictMode>
// );


import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import './index.css'
import Header from './Components/Header'
import Home from './Views/Home'
import Footer from './Components/Footer'
import SidePanel from './Components/SidePanel'
import Assingnments from './Views/Assignments'
import SignUpPage from './Components/SignUpPage'

function Main() {
  const [currentPage, setPage] = useState('Home');

  const pages = {
    Home: Home,
    Assingnments: Assingnments
    // add more pages here
  };

  const CurrentPageComponent = pages[currentPage] || Home;

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex grow flex-row">
        <SidePanel setPage={setPage} />
        <CurrentPageComponent />
      </div>

      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

import Logo from "../assets/Logo.png";
//Header
function Header({name,role,setModal}) {
    return (
    <>
      <header className="shadow-md w-screen bg-white p-3 flex justify-between  items-center">
        <div className="flex flex-row items-center">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="w-10"/>
          <h2 className="text-black">GibJohn Tutoring</h2>
        </div>
        <div className="flex flex-row items-center">
          {role==='Teacher' &&
          // Opens Modal for teacher to add students
          <a className="mr-5 cursor-pointer" onClick={() => setModal([true,'addStudent'])}>Add Students</a>}
          <i className="fa-solid fa-circle-user text-xl mr-1"></i>
          <p className="text-black">{name}</p>
        </div>
      </header>    
    </>
    );
}

export default Header;
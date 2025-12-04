function Header({name,role,setModal}) {
    return (
    <>
      <header className="shadow-md w-screen bg-white p-3 flex justify-between  items-center">
        <h2>GibJohn Tutoring</h2>
        <div className="flex flex-row items-center">
          {role==='Teacher' &&
          <a className="mr-5 cursor-pointer" onClick={() => setModal([true,'addStudent'])}>Add Students</a>}
          <i className="fa-solid fa-circle-user text-xl mr-1"></i>
          <p>{name}</p>
        </div>
      </header>    
    </>
    );
}

export default Header;
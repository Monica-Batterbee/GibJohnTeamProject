import React, { useState } from 'react';
import { getTeachers, postTeachers } from '../Services/TeacherService';
import { getStudents, postStudents } from '../Services/StudentService';
import { all } from 'axios';

function SignIn ({setLoggedIn,setCurrentUser,setRole}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [option, setOption ]= useState('Sign up');
    const [user, setUser] = useState('');
    

    async function handleSubmit(){
        setRole(user);

        if (option === 'Sign up') {
            let [Fname,Sname] = name.split(" ")

            let newUser = {
                Fname : Fname,
                Sname : Sname,
                Email : email,
                Password : password
            }

            if (user === 'Teacher') {
                postTeachers(newUser);
            }
            else {
                postStudents(newUser);    
            }
            setCurrentUser(newUser);
            setLoggedIn(true);
        } 

        else {
            if (user === 'Student') {
                let allStudents = await getStudents();
                const foundUser = allStudents.find( 
                    (u) => u.email === email && u.password === password  
            ); 
            if (foundUser) {
                setLoggedIn(() => true);
                setCurrentUser(() => foundUser)
            }
            }
            else {
                let allTeachers = await getTeachers();
                const foundUser = allTeachers.find( 
                    (u) => u.email === email && u.password === password  
                ); 
                if (foundUser) {
                    console.log("Found")
                    setCurrentUser(() => foundUser)
                    setLoggedIn(() => true);
                }
    
            }
         }

    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#f8f9fa' }}>
                <div style={{ width: '200%', maxWidth: '400px', padding: '20px', border: '2px solid #020202', borderRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>{option}</h1>

                    {option === 'Sign up' &&
                    <div className='flex flex-row w-full items-center justify-center p-3'>
                        <p className='mr-2'>Already have an account?</p>
                        <a className='cursor-pointer' onClick={() => setOption('Log in')}>Log in</a>
                    </div>
                    }

                    {option === 'Log in' &&
                    <div className='flex flex-row w-full items-center justify-center p-3'>
                        <p className='mr-2'>Dont have an account?</p>
                        <a className='cursor-pointer' onClick={() => setOption('Sign up')}>Sign Up</a>
                    </div>
                    }

                    {option === 'Sign up' &&
                    <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #020202', marginBottom: '15px' }}
                        required
                    /></div>}

                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #020202', marginBottom: '15px' }}
                        required
                    />

                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #020202', marginBottom: '20px' }}
                        required
                    />
                        

 <div className="flex justify-between mb-5">
    <div>
      <input
        type="checkbox"
        checked={user === 'Teacher'}
        onChange={() => setUser('Teacher')}
        className="w-4 h-4 scale-150"
      />
      <label className="mx-3">I am a teacher</label>
    </div>
    <div>
      <input
        type="checkbox"
        checked={user === 'Student'}
        onChange={() => setUser('Student')}
        className="w-4 h-4 scale-150"
      />
      <label className="ml-3">I am a student</label>
    </div>
    </div>
    


    <button type="submit" onClick={handleSubmit}
    style={{ width: '100%', padding: '10px', backgroundColor: '#6DBCD1', color: '#020202', border: '1px solid #020202', borderRadius: '4px', cursor: 'pointer' }}>
        {option}
    </button>
                </div>
            </div>
            );
        };


export default SignIn;



//got to make the button go to the login page ~ all done
//i need to have a forget password link that goes to another page
//i also need to be able to link the login page with the signup page ~ all done
//need to learn conditional rendering in react
//make sure that the dimensions are the same for both pages
//make sure the colour scheme is the same for both pages
//add links at the bottom of both page using image links
//make sure that theres validation for this page
//link up both pages to the database
// allow them to press a link that takes them to the login page 






import React, { useState } from 'react';

const SignIn = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        setShowLogin(true);
    };


    if (showLogin) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#f8f9fa' }}>
                <div style={{ width: '200%', maxWidth: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Login</h1>

                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input type="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '15px' }} />

                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input type="password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }} />

                    <button style={{ width: '100%', padding: '10px', backgroundColor: '#00FF85', color: '#020202', border: 'none', borderRadius: '4px'   }}>
                        
                        Login
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#f8f9fa' }}>
                <form onSubmit={handleSubmit} style={{ width: '200%', maxWidth: '400px', padding: '20px', border: '2px solid #020202', borderRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Sign In</h1>

                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #020202', marginBottom: '15px' }}
                        required
                    />

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

                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#6DBCD1', color: '#020202', border: '1px solid #020202', borderRadius: '4px', cursor: 'pointer' }}>
                        Sign In
                    </button>
                </form>
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






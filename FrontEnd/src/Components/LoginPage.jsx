import React, { useState } from 'react';
import { getTeachers, postTeachers } from '../Services/TeacherService';
import { getStudents, postStudents } from '../Services/StudentService';

//Allows users to either log into their account or create an account
function SignIn({ setLoggedIn, setCurrentUser, setRole }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [option, setOption] = useState('Sign up');
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState({});

  //Validates user information to make sure it has been inputted correctly
  const validate = () => {
    const newErrors = {};

    if (!user) newErrors.user = 'Please select a role';

    if (option === 'Sign up') {
      if (!name.trim()) newErrors.name = 'Name is required';
      else if (name.trim().split(' ').length < 2)
        newErrors.name = 'Please enter first and last name';
    }

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Chacks if data has been validated, if so then check to see if access can be granted
  async function handleSubmit() {
    if (!validate()) return;

    setRole(user);

    //Posts new user if user is signing up
    if (option === 'Sign up') {
      const [Fname, Sname] = name.split(' ');

      const newUser = {
        Fname,
        Sname,
        Email: email,
        Password: password,
      };

      if (user === 'Teacher') await postTeachers(newUser);
      else await postStudents(newUser);

      setCurrentUser(newUser);
      setLoggedIn(true);

      //If user is logging in, it searches for the account to make sure it can find it
    } else {
      if (user === 'Student') {
        const allStudents = await getStudents();
        const foundUser = allStudents.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          setErrors({ form: 'Invalid email or password' });
          return;
        }

        setCurrentUser(foundUser);
        setLoggedIn(true);
      } else {
        const allTeachers = await getTeachers();
        const foundUser = allTeachers.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          setErrors({ form: 'Invalid email or password' });
          return;
        }

        setCurrentUser(foundUser);
        setLoggedIn(true);
      }
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">{option}</h1>

        <div className="text-center mb-4 text-sm">
          {option === 'Sign up' ? (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setOption('Log in')}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setOption('Sign up')}
              >
                Sign up
              </button>
            </>
          )}
        </div>

        {option === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={user === 'Teacher'}
              onChange={() => setUser('Teacher')}
            />
            Teacher
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={user === 'Student'}
              onChange={() => setUser('Student')}
            />
            Student
          </label>
        </div>
        {errors.user && <p className="text-red-500 text-sm mb-2">{errors.user}</p>}

        {errors.form && <p className="text-red-500 text-sm mb-2">{errors.form}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-sky-400 hover:bg-sky-500 text-black py-2 rounded-lg font-medium"
        >
          {option}
        </button>
      </div>
    </div>
  );
}

export default SignIn;

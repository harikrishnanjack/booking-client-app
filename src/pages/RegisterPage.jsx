import {Link} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';


export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function registerUser(ev) {
      ev.preventDefault();
      try {
        await axios.post('/api/register', {
          name,
          email,
          password,
        });
        alert('Registration successful. Now you can log in');
      } catch (e) {
        alert('Registration failed. Please try again later');
      }
    }
    return (
        <div className="mt-0 md:mt-24 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text"
                   className="focus:outline-none border-primary"
                   placeholder="John Doe"
                   value={name}
                   onChange={ev => setName(ev.target.value)} />
            <input type="email"
                   className="focus:outline-none border-primary"
                   placeholder="your@email.com"
                   value={email}
                   onChange={ev => setEmail(ev.target.value)} />
            <input type="password"
                   className="focus:outline-none border-primary"
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)} />
            <button className="primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member? <Link className="text-black hover:underline ease-out duration-500" to={'/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    )
}
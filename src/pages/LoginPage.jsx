import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from 'axios';
import { UserContext } from "../components/UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
      ev.preventDefault();
      try {
        const {data} = await axios.post('/api/login', {email,password});
        setUser(data);
        alert('Login successful');
        setRedirect(true);
      } catch (e) {
        alert('Login failed');
      }
    }
  
    if (redirect) {
      return <Navigate to={'/'} />
    }
    return (
        <div className="mt-0 md:mt-24 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            <button className="primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet? <Link className="text-black hover:underline ease-out duration-500" to={'/register'}>Register now</Link>
            </div>
          </form>
        </div>
      </div>
    )
}
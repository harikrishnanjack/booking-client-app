import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from 'axios';
import { UserContext } from "../components/UserContext";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; 

export default function LoginPage(){

    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (datas) => {
      try {
        const {data} = await axios.post('/api/login', datas);
        setUser(data);
        toast.success('Login successful',{ position: toast.POSITION.BOTTOM_CENTER,closeButton:true,progress:false,autoClose:true })
        setRedirect(true);
      } catch (e) {
        toast.error('Login Fail',{ position: toast.POSITION.BOTTOM_CENTER,closeButton:true,progress:false,autoClose:true })
      }
    }

  
    if (redirect) {
      return <Navigate to={'/'} />
    }
    return (
        <div className="mt-0 md:mt-24 grow flex items-center justify-around">
        <div className="mb-64 w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <input type="email"
                   className="focus:outline-none border-primary"
                   placeholder="your@email.com"
                   {...register("email",{ required: true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                   />
                   <div>
                     {errors.email && <p className="text-red-700 text-sm">Please check the Email</p>}
                   </div>
            <input type="password"
                   className="focus:outline-none border-primary"
                   placeholder="password"
                   {...register("password",{required:true})} 
                   />
                   <div>
                   {errors.password && <p className="text-red-700 text-sm">Password is required</p>}
                   </div>
            <button className="primary hover:bg-gray-300 hover:text-black hover:font-bold ease-out duration-500">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet? <Link className="text-black hover:underline ease-out duration-500" to={'/register'}>Register now</Link>
            </div>
          </form>
        </div>
      </div>
    )
}
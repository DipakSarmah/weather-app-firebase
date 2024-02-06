import React, { useState } from 'react'
import {auth,provider} from '../firebase'
import { signInWithPopup,createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


function Signin({setIsAuth}) {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [isError,setIsError]=useState(false);
    let navigate = useNavigate();

    const handleSignInSubmit=async (e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            navigate("/");
        }catch(err){
            setIsError(true);
            console.error(err);
        }
        


    }
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
        
        <div className='bg-blue-500 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'>
            <div className='md:w-1/2 px-10'>
                <h2 className='font-bold text-2xl text-center'>Signin</h2>
                <form className='flex flex-col gap-4' onSubmit={handleSignInSubmit}>
                    <input className='p-2 mt-5 rounded-xl border' type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input  className='p-2 mt-5 rounded-xl border'type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="bg-[#002D74] text-white rounded-xl py-2 hover:scale-105 duration-300" type="submit">Signin</button>
                </form>
                {/* <div className='mt-10 grid grid-cols-3 items-center'>
                    <hr className='border-gray-400'/>
                    <p className='text-center'>OR</p>
                    <hr className='border-gray-400'/>
                </div>
                <button onClick={handleLoginWithGoogle} className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300'><img className="mr-4 w-[25px] h-[25px]" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Login With Google</button> */}

                <div className='mt-3 text-xs flex justify-between items-center'>
                    <p>Have An Account..</p>
                    <button className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"><Link to="/login">Login</Link></button>
                </div>
            </div>
            <div className='md:block hidden w-1/2'>
                <img className='rounded-2xl' src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=1060&t=st=1707131260~exp=1707131860~hmac=a172b153f6ca435395ae491fe6d065a2e942b98b981b91d4325852e7c4596468" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Signin;

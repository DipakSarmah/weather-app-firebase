import WeatherApp from './components/WeatherApp/WeatherApp';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import cloudimg from './components/Assets/cloudimage.png'
import UserDetails from './components/UserDetails';
import './App.css'
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import {auth} from './firebase'
import Signin from './components/Signin'

function App() {
  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";

    })
  }
  return (
    <Router>  
      <div className='bg-blue-200'>
        <nav className='flex justify-between items-center w-[90%] mx-auto'>
          <div>
              <Link to="/"><img className="w-16" src={cloudimg} alt="cloud"/></Link>
          </div>
          <div>
            <ul className='flex items-center gap-[4vw]'>
              <li className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 scale-105 duration-300'><Link className="" to="/">Home</Link></li>
              <li className='bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-500 scale-105 duration-300'><Link  className="hover:text-blue-600" to='/users'>User Details</Link></li>
              {!isAuth ? (
                <li className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 scale-105 duration-300'><Link  className="hover:text-blue-600" to='/login'>Login</Link></li>
              ):(
                <li className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 scale-105 duration-300'><button onClick={signUserOut} className="hover:text-blue-600">Log Out</button></li>

              )}
            </ul> 
          </div>
        </nav>
      </div>
      <Routes>
      
        <Route path='/' element={<WeatherApp isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />
        <Route path='/signin' element={<Signin setIsAuth={setIsAuth}/>}/>
        <Route path='/users' element={<UserDetails isAuth={isAuth}/>} />
      </Routes>

    </Router>
  );
}

export default App;

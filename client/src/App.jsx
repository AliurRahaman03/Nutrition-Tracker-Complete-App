import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Components/Register'
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Track from './Components/Track';
import Diet from './Components/Diet';
import Private from './Components/Private';
import { UserContext } from './contexts/UserContext';
import { useState,useEffect } from 'react';
import Navbar from './Components/Navbar';

// import Navbar from './Components/Navbar'

function App() {

  const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem('userData')));

  // const navigate=useNavigate();

  useEffect(()=>{
    console.log(loggedUser)
  },[])

  return (    
    <div className='app'>
    
      <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
        
          <Route path='/' element={<Navbar/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path="/register" element={<Register/>} />

          <Route path='*' element={<NotFound/>}/>

          <Route path='/track' element={<Private Component={Track}/>} />
          <Route path='/diet' element={<Private Component={Diet} />} />


        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
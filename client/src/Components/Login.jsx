import { useContext,useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';

function Login() {

  const loggedData=useContext(UserContext);


  

  const navigate=useNavigate();

  const [userCreds,setUserCreds]=useState({
    email:"",
    password:""
  })

  const [message,setMessage]=useState({
    type:"invisible-msg",
    text:"Dummy"
  })


  function handleInput(event)
  {
    setUserCreds((prevState)=>{
      return {...prevState,[event.target.name]:event.target.value}
    })
  }

  function handleLogin(event)
  {

    event.preventDefault();

    fetch("http://localhost:8000/login",{
      method: "POST",
      body:JSON.stringify(userCreds),
      headers:{
        "content-type":"application/json"
      }
    })
    .then((response)=>{
      console.log(response)
      if (response.status===404)
      {
        setMessage({type:'error',text:"Username or Email Doesn't Exist"})
      }
      else if(response.status===403)
      {
        setMessage({type:"error",text:"Incorrect Password"})
      }
      else if (response.status===200)
      {
        return response.json();
      }

      setTimeout(()=>{
        setMessage({type:"invisible-msg",text:"Dummy"})
      },3000);

      setUserCreds({email:"",password:""})

    })
    .then((data)=>{

      console.log(data.token)
      // setMessage({type:"success",text:data.message})

      if (data.token!==undefined)
      {
        localStorage.setItem("userData",JSON.stringify(data));

        loggedData.setLoggedUser(data)

        navigate('/track')
      }
      
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  return (
    <section className="container">

        <form method="POST" className="form" onSubmit={handleLogin}>

          
          <h1>Login To Fitness</h1>
          
          <input className="inp" type="email" placeholder="Enter Email" name="email" 
          onChange={handleInput} value={userCreds.email}/>

          <input className="inp" type="password" placeholder="Enter Password" name="password" 
          onChange={handleInput} value={userCreds.password}/>

          <button className='btn' >Log in</button>

          <p>Don&#39;t Have an Account ?  <Link to='/register'>Register Here</Link></p>

          <p className={message.type}>{message.text}</p>

        </form>

      </section>
  )
}

export default Login
import { useState } from 'react'
import {Link} from 'react-router-dom'


function Register() {

    const [userInfo,setUserInfo]=useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    const [message,setMessage]=useState({
        type:"",
        text:""
    })

    function handleInput(event)
    {
        setUserInfo((prevState)=>{
            return{...prevState,[event.target.name]:event.target.value}
        })
    }


    function handleSubmit(event){
        event.preventDefault();
    //    console.log(userInfo)

       fetch("http://localhost:8000/register",{
        method:'POST',
        body:JSON.stringify(userInfo),
        headers:{
            "content-type": "application/json"
        }
       })
       .then((response)=>response.json())
       .then((data)=>{

        setMessage({type:'success',text:data.message})

        setUserInfo({
            name:"",
            email:"",
            password:"",
            age:""
        })

        setTimeout(()=>{
            setMessage({type:"",text:""});
        },5000)

       })
       .catch((err)=>{
        console.log(err)
       })
    }




  return (
      <section className="container">

        <form className="form" onSubmit={handleSubmit} >

          <p className={message.type}>{message.text}</p>

          <h1>Start Your Fitness</h1>

          <input className="inp" type="text" required onChange={handleInput}
           placeholder="Enter Name" name="name" value={userInfo.name} />
          
          <input className="inp" type="email" required onChange={handleInput}
           placeholder="Enter Email" name="email" value={userInfo.email}/>

          <input className="inp" type="password" required minLength={6} onChange={handleInput}
           placeholder="Enter Password" name="password" value={userInfo.password}/>

          <input className="inp" type="number" required onChange={handleInput}
           placeholder="Enter Age" name="age" value={userInfo.age}/>

          <button className='btn' onClick={handleSubmit} >JOIN</button>

          <p>Already Registered ?  <Link to='/login'>Login</Link></p>

          

        </form>
        
      </section>
    
  )
}

export default Register
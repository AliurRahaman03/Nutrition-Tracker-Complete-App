import { useContext,useState } from "react"
import { UserContext } from "../contexts/UserContext"
import Food from "./Food";


function Track() {

  const loggedData=useContext(UserContext);
  const [foodItem,setFoodItem]=useState([]);
  const [food,setFood]=useState(null);

  

  function searchFood(event)
  {

    if(event.target.value.length!==0){
      fetch(`http://localhost:8000/foods/${event.target.value}`,{
        method:'GET',
        headers:{
          "Authorization":"Bearer "+loggedData.loggedUser.token,
        
        }
      })
      .then((response)=>response.json())
      .then((data)=>{
        if(data.message===undefined)
        {
         setFoodItem(data); 
        }
        else
        {
          setFoodItem([]);
        }
        
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else
    {
      setFoodItem([]);
    }

  }



  return (
    <>

    <section className="container track-container">

      {/* <input type="search" placeholder="" /> */}
      <div className="search">

        <input className="search-inp" type="search" onChange={searchFood}
         placeholder="Search Food Items" />

        {
          foodItem.length!==0?
            <div className="food-items">

              {
                foodItem.map((item)=>{
                  console.log(item)
                  return(
                    <p className="item" onClick={()=>{
                      setFood(item)
                    }} key={item._id}>{item.name}</p>
                  )
                })
              }
         </div>
         :null
        }
         
      </div>
      {
        food!==null?
        <Food foods={food}/>
        :null
      }
      

    </section>

    </>
  )
}

export default Track
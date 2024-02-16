/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


export default function Food(props)
{
    const [quantity,setQuantity]=useState(100);
    const [food,setFood]=useState({})
    const [foodInitial,setFoodInitial]=useState({});
    const loggedData=useContext(UserContext)
    const navigate=useNavigate();
    

    useEffect(()=>{
        setFood(props.foods)
        setFoodInitial(props.foods)
    },[props.foods])

    function handleInput(e){
        setQuantity(Number(e.target.value));
    }

    function claculateQty(event)
    {    

        if(event.key==='Enter')
        {
            let prevFood={...food}

            prevFood.protein=(foodInitial.protein*quantity)/100;
            prevFood.fat=(foodInitial.fat*quantity)/100;
            prevFood.carbohydrates=(foodInitial.carbohydrates*quantity)/100;
            prevFood.fiber=(foodInitial.fiber*quantity)/100;
            prevFood.calories=(foodInitial.calories*quantity)/100;
            
            setFood(prevFood)
        }
    }

    function trackFoodItem()
    {
        let trackedItem={
            userId:loggedData.loggedUser.userid,
            foodId:food._id,
            details:{
                calories:food.calories,
                carbohydrates:food.carbohydrates,
                protein:food.protein,
                fat:food.fat,
                fiber:food.fiber
            },
            quantity:quantity
        }
        console.log(trackedItem);

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

        navigate("/diet")

    }


    return(
        <div className="food">

        <div className="food-img">
          <img className="f-img" src={food.imageUrl} alt="" />
        </div>

        <h2>{food.name} ({food.calories} KCal for{quantity}G)</h2>

        <div className="nutrient">
          <p className="n-title">Protein</p>
          <p className="n-value">{food.protein}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Fat</p>
          <p className="n-value">{food.fat}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Carbs</p>
          <p className="n-value">{food.carbohydrates}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Fiber</p>
          <p className="n-value">{food.fiber}g</p>
        </div>

        <div className="track-control">
           <input type="number" className="inp inp-qty" onChange={handleInput} onKeyDown={claculateQty}
            placeholder="Qty in gms" />
            <button className="btn btn-track" onClick={trackFoodItem}>Track</button>
        </div>

      </div>
    )
}
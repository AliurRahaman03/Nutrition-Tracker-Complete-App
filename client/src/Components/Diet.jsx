import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"

function Diet() {

    const loggedData=useContext(UserContext);
    const[items,setItems]=useState([])


    let [total,setTotal]=useState({
        totalCalories:0,
        totalProtein:0,
        totalCarbohydrates:0,
        totalFat:0,
        totalFiber:0
    })


    useEffect(()=>{

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/02-15-2024`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data)
            setItems(data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    useEffect(()=>{
        calculateTotal();
    },[items])

    function calculateTotal()
    {
        let totalCopy={...total}

        items.forEach((item)=>{
            totalCopy.totalCalories+=item.details.calories;
            totalCopy.totalCarbohydrates+=item.details.carbohydrates;
            totalCopy.totalProtein+=item.details.protein;
            totalCopy.totalFat+=item.details.fat;
            totalCopy.totalFiber+=item.details.fiber;
        })

        setTotal(totalCopy)
    }


  return (
    <section className="container diet-container">

        {
            items.map((item)=>{

                

                return(
                    <div className="d-item" key={item.foodId._id}>
                        <h3>{item.foodId.name} ({item.details.calories} KCal for {item.quantity})</h3>
                        <p>Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}</p>
                    </div>
                )
            })
        }

        <div className="d-item">
            <h1>TOTAL</h1>
            <h3>{total.totalCalories} KCal</h3>
            <p>Protein {total.totalProtein}g, Carbs {total.totalCarbohydrates}g, Fats {total.totalFat}g, Fiber {total.totalFiber}</p>
        </div>

    </section>
  )
}

export default Diet
import { useState, useEffect } from "react";

function CatFacts() {
    const[facts, setFacts] = useState(["Cats are cool", "Cats are nice"]);
    const [isLoaded, setIsLoaded] = useState(false); 
    

    const displayFacts = () =>{
        return facts.map(elem=>
            <li>{elem}</li> // return the jsx to render
        )
    }

    useEffect(()=>{
        // our code goes here
        fetch("https://cat-fact.herokuapp.com/facts")
        .then(response=>response.json())
        .then(data=>{
            setFacts(data.map(e=>e.text)) // get the array of text out and set it as our state
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
        }
    )

    if(isLoaded){
        return (
            <ul>
                {displayFacts()}
            </ul>
        )
    }
    else{
        return (
            <img src="loading-thinking.gif" alt="doge thinking" />
        )
    }

}

export default CatFacts
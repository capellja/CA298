import { useEffect, useState }  from "react";

function BookList() {
    const[info, setInfo] = useState(["empty", "empty"]);
    

    const displayInfo = () =>{
        return info.map(elem=>
            <li>{elem}</li> // return the jsx to render
        )
    }

    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/books/")
        .then(response=>response.json())
        .then(data=>{
            setInfo(data.map(e=>e.title)) // get the array of text out and set it as our state
        })
        .catch(err=>console.log(err))
        }
    )

    return (
        <ul>
            {displayInfo()}
        </ul>
    )

}

export default BookList
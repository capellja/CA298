import {useState} from "react"; 

function Counter (){
    const [myVar, setMyVar] = useState(0);

    return (
        <p>

        {myVar}
        <br></br>

        <button onClick={
            ()=>{
                    setMyVar(myVar + 1);
                }
        }>Click me </button>

        </p>
    )

}

export default Counter;
import { useEffect, useState } from "react";

function DegreeList() {
  const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData () {
			try {
        const req = `http://127.0.0.1:8000/api/degree`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);
				setError("");
			}
            catch (err) {
				setError("An error occurred while fetching data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const displayData = () => {
        if (loading) {
          return <img src="shibthinking.gif" alt="loading" />;
        }
      
        if (error) {
          return <p>{error}</p>;
        }
      
        return (
            <div>
    <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "50px", margin: "20px" }}>ALL DEGREES</h1>
          <div className="card-container">
            {data.map((degree) => (
              <div className="card" key={degree.full_name}>
                <h3 style={{ color: "gray"}} >{degree.full_name}</h3>
                <p>{degree.shortcode}</p>
              </div>
            ))}
          </div>
          </div>
        );
      };
      

	return (
		<div>
			{displayData()}
		</div>
	);
}

export default DegreeList

/*
import { useEffect, useState }  from "react";
import { Link } from "react-router-dom";


function DegreeList() {
    const[data, setData] = useState(["empty", "empty"]);
    

    const displayData = () => {
        return (
            <div>
          <ul>
            {data.map(degree => (
                <div>
                <h3>{degree.shortcode}</h3>
                <p>{degree.full_name}</p>
                </div>
            ))}
          </ul>
          <Link to="/">return home</Link>
          </div>
        );
      }

    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/degree/")
        .then(response=>response.json())
        .then(data=>{
            setData(data); // get the array of text out and set it as our state
        })
        .catch(err=>console.log(err));
        
    }, []);

    return (
        <ul>
            {displayData()}
        </ul>
    )

}

export default DegreeList
*/
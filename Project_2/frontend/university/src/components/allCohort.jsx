import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CohortList() {
    const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData () {
			try {
                const req = `http://127.0.0.1:8000/api/cohort`;
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
        if (loading) { // render loading image if loading is true
            return <img src="shibthinking.gif" alt="loading" />;
        }

        //console.log(data);

		if (error) {
			return <p>{error}</p>;
		}

		return (
            <div>
    <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "50px", margin: "20px" }}>ALL COHORTS</h1>
			<div className="card-container">
                    {data.map((cohort) => (
                    <div className="card" key={cohort.id}>
                    <h3 style={{ color: "gray"}}>{cohort.id}</h3>
                    <p>Year : {cohort.year}</p>
                    <p>{cohort.degree.split('/')[5]}</p>
                    <p>{cohort.name}</p>
                    <br></br>

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

export default CohortList


/*
function CohortList() {
    const[data, setData] = useState(["empty", "empty"]);
    

    const displayData = () => {
        return (
            <div>
          <ul>
            {data.map(degree => (
                <div>
                <h3>{degree.id}</h3>
                <p>{degree.year}</p>
                <p>{degree.degree}</p>
                <p>{degree.name}</p>

                </div>
            ))}
          </ul>
          <Link to="/">return home</Link>
          </div>
        );
      }

    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/cohort/")
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

export default CohortList
*/
import { useEffect, useState } from "react";

function ModuleList() {
    const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData () {
			try {
                const req = `http://127.0.0.1:8000/api/module`;
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
                <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "50px", margin: "20px" }}>ALL MODULES</h1>

			<div className="card-container">
                    {data.map((module) => (
                    <div className="card" key={module.code}>
                    <h3 style={{ color: "gray"}}>{module.code}</h3>
                    <p>{module.full_name}</p>
                    <ul>
                        <i>Delivered to:</i>
                        {module.delivered_to.map((option) => (
                            <li key={option}>{option.split('/')[5]}</li>
                        ))}
                    </ul>
                    <p>CA SPLIT : {module.ca_split}</p>
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

export default ModuleList

/*
function ModuleList() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
  
		async function fetchData () {
            try {
            const req = `http://127.0.0.1:8000/api/module/`;
            const response = await fetch(req);
            const data = await response.json();
            setData(data);
            setError('');   //set error string to null
        } catch (err) {
            setError('An error occurred while fetching data');
    };
    }
  
    fetchData();
    }, [], );
  
    const displayData = () => {
        if (error) {
            return <p>{error}</p>;
    }
  
    if (!data.length) {
        return <p>No degrees found</p>; // return if no data is return from api endpoint
    }
  
    return (
        <div>
          <ul>
            {data.map((module) => (
            <div>
                <h3>{module.code}</h3>
                <h3>{module.full_name}</h3>
                <p>{module.delivered_to}</p>
            </div>
            ))}
            </ul>

            <Link to="/">return home</Link>
        </div>
        );
    };
  
    return (
        <div>
            
        <ul>{displayData()}</ul>
        </div>
    );
}
  
export default ModuleList;
*/
import { useEffect, useState }  from "react";

function ModulestoCohort() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // new state variable
  
    const handleChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        setMessage(inputValue);
    };
  
    const handleClick = () => {
        if (!/\d/.test(message) || !/[a-zA-Z]/.test(message)) {
			setError('Please enter a valid Cohort ID');
			return;
		  }
        
        setUpdated(message);
        setClicked(true);
      };
  
    useEffect(() => {
        if (!clicked) {
            return;
        }
  
		async function fetchData () {
            setLoading(true); // set loading to true when fetching data
            try {
                const req = `http://127.0.0.1:8000/api/module/?delivered_to=${updated}`;
                const response = await fetch(req);
                const data = await response.json();
                setData(data);
                setError('');   //set error string to null
            } catch (err) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);  // set loading to false when data has been fetched
                setClicked(false);
                setUpdated('');
            }
        };
  
        fetchData();
    }, [clicked, updated]);
  
    const displayData = () => {
        if (loading) { // render loading image if loading is true
            return <img src="shibthinking.gif" alt="loading" />;
        }
  
        if (error) {
            return <p>{error}</p>;
        }
  
        if (!data.length) {
            return <p>Cohort not Found</p>;
        }
  
        return (
            <div>
            <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>MODULES</h1>
            <div className="card-container">
                    {data.map((modules) => (
                        <div className = "card" key={modules.code}>
                            <h3 style={{ color: "gray"}}>{modules.code}</h3>
                            <p>{modules.full_name}</p>
                            <ul>
                            Delivered to:
                            {modules.delivered_to.map((option) => (
                                <li key={option}>{option.split('/')[5]}</li>
                            ))}
                            </ul>
                            <p>CA Split: {modules.ca_split}</p>
                        </div>
                    ))}
                <br></br>
            </div>
            </div>
        );
    };
  
    return (
        <div>
            <div>
            <input
                type="text"
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
                className="input-box"
                />
                <button onClick={handleClick} className="submit-button">
                VIEW MODULES
                </button>
            </div>
        
            {displayData()}
        </div>
    );
}
  
export default ModulestoCohort;
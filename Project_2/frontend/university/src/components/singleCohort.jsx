import { useEffect, useState }  from "react";

function SingleCohort() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  
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
    
    setLoading(true);
    async function fetchData() {
        try {
            const req = `http://127.0.0.1:8000/api/student/?cohort=${updated}`;
            const response = await fetch(req);
            const data = await response.json();
            setData(data);
            setError('');   //set error string to null
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
            setClicked(false);  //reset clicked for refresh
            setUpdated(''); //....
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
        return <p>Cohort not found</p>; // return if no data is return from api endpoint
    }
  
    return (
        <div>
            <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>STUDENTS</h1>

        <div className="card-container">
            {data.map((student) => (
            <div className = "card" key={student.student_id}>
                <h3 style={{ color: "gray"}}>ID : {student.student_id}</h3>
                <p>Fn: {student.first_name}</p>
                <p>Sn: {student.last_name}</p>
                <p>{student.email}</p>

            </div>
            ))}
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
                VIEW COHORT
                </button>

			</div>

			{displayData()}
		</div>
	);
}
  
export default SingleCohort;
  
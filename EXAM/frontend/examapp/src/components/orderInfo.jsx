import { useEffect, useState } from "react";

function OrderInfo() {
    const [data, setData] = useState([]);
	const [data2, setData2] = useState([]);

	const [message, setMessage] = useState("");
	const [updated, setUpdated] = useState("");
	const [clicked, setClicked] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
        setMessage(event.target.value);
	};

	const handleClick = () => {
        // Check if message is valid
        /*
        const capitalLettersOnly = /^[A-Z]+$/;
        const isValidCapitalLetters = capitalLettersOnly.test(message);
      
        
        if (!isValidCapitalLetters) {
          setError("Please enter a valid degree code");
          return;
        }
        */
      
        // If message is valid, update state and fetch data
        setUpdated(message);
        setClicked(true);
      };
      

	useEffect(() => {
		if (!clicked) {
			return;
		}

		setLoading(true);
		async function fetchData () {
			try {
                const req = `http://127.0.0.1:8000/api/order/${updated}`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);
				setError("");

                const req2 = `http://127.0.0.1:8000/api/orderitem/?order=${updated}`;
				const response2 = await fetch(req2);
				const data2 = await response2.json();
				setData2(data2);
				setError("");
			}
            catch (err) {
				setError("An error occurred while fetching data");
			} finally {
				setLoading(false);
				setClicked(false);
				setUpdated("");
			}
		};

		fetchData();
	}, [clicked, updated]);

	const displayData = () => {
        if (loading) { // render loading image if loading is true
            return <img src="shibthinking.gif" alt="loading" />;
        }

        console.log(data);

		if (error) {
			return <p>{error}</p>;
		}

		if (!data.length) {
			return <p>Category not Found</p>;
		}


		return (

				<div>
					<h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>ORDER INFO</h1>
	
				<div className="card-container">
					<div className="card">
					<h3 style = {{ color: "rgb(210, 103, 9)"}}>ID : {}</h3>
						<p>FN : {}</p>
						<p>LN : {}</p>
						<p></p>
						<p>{}</p>
						</div>
						<br />
						{data2.map((info) => (
						<div className = "card" key={info.name}>
						<h3>{}</h3>
						<p>TOTAL : {}</p>
						<p>CA : {}</p>
					   <p>EXAM : {}</p>
						<br></br>
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
                VIEW ORDER INFO
                </button>

			</div>

			{displayData()}
		</div>
	);
}

export default OrderInfo

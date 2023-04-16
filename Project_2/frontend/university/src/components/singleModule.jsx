import { useEffect, useState } from "react";

function SingleModule() {
    const [data, setData] = useState([]);
	const [message, setMessage] = useState("");
	const [updated, setUpdated] = useState("");
	const [clicked, setClicked] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const inputValue = event.target.value.toUpperCase();
        setMessage(inputValue);
	};

	const handleClick = () => {
		if (!/\d/.test(message) || !/[a-zA-Z]/.test(message)) {
			setError('Please enter a valid Module ID');
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
		async function fetchData () {
			try {
				const req = `http://127.0.0.1:8000/api/module/${updated}`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);
				setError("");
			} catch (err) {
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

		if (error) {
			return <p>{error}</p>;
		}

		if (!data.code) {
			return <p>Module not Found</p>;
		}

		return (
			<div>
			<h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>MODULE</h1>
			<div className="card-container">
			<div className="card">
				<h3 style={{ color: "gray"}}>{data.code}</h3>
					<p>{data.full_name}</p>
					<div>
						<p>Delivered to:</p>
						<ul>
							{data.delivered_to.map((item, index) => ( // map out
								<li key={index}>{item.split('/')[5]}</li>
							))}
						</ul>
					</div>
			</div>
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
                VIEW MODULE
                </button>
			</div>

			{displayData()}
		</div>
	);
}

export default SingleModule;
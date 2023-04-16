import { useEffect, useState } from "react";

function SingleStudent() {
    const [data, setData] = useState([]);
    const [Gradedata, setGradeData] = useState([]);

	const [message, setMessage] = useState("");
	const [updated, setUpdated] = useState("");
	const [clicked, setClicked] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	const handleClick = () => {
		if (!/^\d{8}$/.test(message)) {
			setError('Please enter a valid Student ID (8 numeric characters in length)');
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
				const req = `http://127.0.0.1:8000/api/student/${updated}`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);

                const req2 = `http://127.0.0.1:8000/api/grade/?student=${updated}`;
                const response2 = await fetch(req2);
                const Gradedata = await response2.json();
                setGradeData(Gradedata);
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

        //console.log(data);
        //console.log(Gradedata);

		if (error) {
			return <p>{error}</p>;
		}

		if (!data.student_id) {
			return <p>Student not Found</p>;
		}

        const { student_id, first_name, last_name, cohort, email } = data;

		return (
			<div>
				<h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>GRADES</h1>

			<div className="card-container">
				<div className="card">
                <h3 style = {{ color: "rgb(210, 103, 9)"}}>ID : {student_id}</h3>
                    <p>FN : {first_name}</p>
                    <p>LN : {last_name}</p>
                    <p>{cohort.split('/')[5]}</p>
                    <p>{email}</p>
					</div>
                    <br />
                    {Gradedata.map((grade) => (
                    <div className = "card" key={grade.id}>
                    <h3>{grade.module.split('/')[5]}</h3>
                    <p>TOTAL : {grade.total_grade}</p>
                    <p>CA : {grade.ca_mark}</p>
                   <p>EXAM : {grade.exam_mark}</p>
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
                VIEW STUDENT
                </button>
			</div>

			{displayData()}
		</div>
	);
}

export default SingleStudent
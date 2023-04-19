import { useEffect, useState } from "react";

function FormCohort() {
  const [newCohort, setnewCohort] = useState({ id: "", year: "", degree: "", name: "" });
  const [degreeOptions, setDegreeOptions] = useState([]);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/degree/");
        const data = await response.json();
        setDegreeOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDegrees();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewCohort((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {

     // Check if id contains only uppercase letters and numbers
     if (!/^[A-Z0-9]+$/.test(newCohort.id)) {
      alert("ID must contain only uppercase letters and numbers.");
      return;
    }

    if (!Number.isInteger(parseInt(newCohort.year))) {
      alert("Year must be an integer.");
      return;
    }

    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCohort),
      });

      if (response.ok) {
        setnewCohort({ id: "", year: "", degree: "", name: "" });
        alert("Cohort created successfully!");
      } else {
        const error = await response.text();
        alert(`Cohort creation failed: ${error}`);
      }
    } catch (error) {
      alert(`Cohort creation failed: ${error}`);
    }
  };

  return (
    <div>
      <div>
          <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>CREATE COHORT</h1>
          </div>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="id">ID:</label>
        <input className ="input-field" type="text" id="year" name="id" value={newCohort.id || ""} onChange={handleInputChange} />
        <br />
        <label htmlFor="year">Year:</label>
        <input className ="input-field" type="integer" id="year" name="year" value={newCohort.year || ""} onChange={handleInputChange} />
        <br />
        <label htmlFor="degree">Degree:</label>
        <select className ="input-field"  id="degree" name="degree" value={newCohort.degree} onChange={handleInputChange}>
          <option value="">Select a degree</option>
          {degreeOptions.map((degree) => (
            <option key={degree.shortcode} value={`http://127.0.0.1:8000/api/degree/${degree.shortcode}/`}>
              {degree.shortcode}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="name">Name:</label>
        <input className ="input-field" type="text" id="name" name="name" value={newCohort.name || ""} onChange={handleInputChange} />
        <br />
        <button className ="submit-button" type="submit">Create Cohort</button>
      </form>
      <br />
    </div>
  );
}

export default FormCohort;

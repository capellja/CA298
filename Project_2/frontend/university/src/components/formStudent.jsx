import { useEffect, useState } from "react";


function FormStudent () {
  const [newStudent, setnewStudent] = useState({ student_id: "", first_name: "", last_name: "", cohort: "", email: ""});
  const [cohortOptions, setCohortOptions] = useState([]);

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cohort/");
        const data = await response.json();
        setCohortOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCohort();
  }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;   // extracts name, value from target object; fields below
        setnewStudent((prevState) => ({ ...prevState, [name]: value })); // takes previous state, as to save data from other input, update newStudent with ([name]: value pair,
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!Number.isInteger(parseInt(newStudent.student_id))) {
          alert("Student ID must be an integer.");
          return;
        }
        if (newStudent.student_id.toString().length !== 8) {
          alert("Student ID must be an 8-digit number.");
          return;
        }

        if (!/^[a-zA-Z]+$/.test(newStudent.first_name)) {
          alert("First name must contain only letters.");
          return;
        }

        if (!/^[a-zA-Z]+$/.test(newStudent.last_name)) {
          alert("Last name must contain only letters.");
          return;
        }
        
      
        try {
          const response = await fetch("http://127.0.0.1:8000/api/student/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          });
      
          if (response.ok) {
            // Module created successfully, reset form inputs and display success message
            setnewStudent({ student_id: "", first_name: "", last_name: "", cohort: "", email: ""});
            alert("Student created successfully!");
          } else {
            // Module creation failed, display error message
            const error = await response.text();
            alert(`Student creation failed: ${error}`);
          }
        } catch (error) {
          // Network error or other exception, display error message
          alert(`Student creation failed: ${error}`);
        }
    };

    return (
        <div>
          <div>
          <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>CREATE STUDENT</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="student_id">Student ID</label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              className ="input-field"
              value={newStudent.student_id || "" }
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className ="input-field"
              value={newStudent.first_name || "" }
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className ="input-field"
              value={newStudent.last_name || "" }
              onChange={handleInputChange}
            />
            <br></br>
            <label htmlFor="cohort">Cohort:</label>
            <select className ="input-field" id="cohort" name="cohort" value={newStudent.cohort} onChange={handleInputChange}>
            <option value="">Select a Cohort</option>
            {cohortOptions.map((cohort) => (
            <option key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>
            {cohort.id}
            </option>
             ))}
          </select>
            
            <br /><label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className ="input-field"
              value={newStudent.email || "" }
              onChange={handleInputChange}
            />
            <br />
            <button className ="submit-button" type="submit">Create Student</button>
          </form>
          <br />
        </div>
    );
      
}

export default FormStudent
import { useState }  from "react";


function AddGrade () {
    const [newGrade, setnewGrade] = useState({module: "", ca_mark: "", exam_mark: "", cohort: "", total_grade:"", student:""});
	  const [updated] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;   // extracts name, value from target object; fields below
        setnewGrade((prevState) => ({ ...prevState, [name]: value })); // takes previous state, as to save data from other input, update newGrade with ([name]: value pair,
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/^[A-Z0-9]+$/.test(newGrade.module)) {
          alert("Module code must contain only uppercase letters and numbers.");
          return;
        }

        const ca_mark = parseInt(newGrade.ca_mark);
        if (!Number.isInteger(ca_mark) || ca_mark < 0 || ca_mark > 100) {
          alert("CA mark must be an integer between 0 and 100.");
          return;
        }

        const examMark = parseInt(newGrade.exam_mark);
        if (!Number.isInteger(examMark) || examMark < 0 || examMark > 100) {
          alert("Exam mark must be an integer between 0 and 100.");
          return;
        }

        if (!/^[A-Z0-9]+$/.test(newGrade.cohort)) {
          alert("Cohort code must contain only uppercase letters and numbers.");
          return;
        }

        const total_grade = parseInt(newGrade.total_grade);
        if (!Number.isInteger(total_grade) || total_grade < 0 || total_grade > 100) {
          alert("Total grade must be an integer between 0 and 100.");
          return;
        }

        if (!Number.isInteger(parseInt(newGrade.student))) {
          alert("Student ID must be an integer.");
          return;
        }
        if (newGrade.student.toString().length !== 8) {
          alert("Student ID must be an 8-digit number.");
          return;
        }

      
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/grade/?student=${updated}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...newGrade, 
            module: `http://127.0.0.1:8000/api/module/${newGrade.module}/`,
            cohort: `http://127.0.0.1:8000/api/cohort/${newGrade.cohort}/`,
            student: `http://127.0.0.1:8000/api/student/${newGrade.student}/`,
          }),
          });
      
          if (response.ok) {
            // Module created successfully, reset form inputs and display success message
            setnewGrade({ module: "", ca_mark: "", exam_mark: "", cohort: "", total_grade:"", student:""});
            alert("Grades added successfully!");
          } else {
            // Module creation failed, display error message
            const error = await response.text();
            alert(`Grades creation failed: ${error}`);
          }
        } catch (error) {
          // Network error or other exception, display error message
          alert(`Grades creation failed: ${error}`);
        }
    };

    const displayForm = () => {

      return (
          <div>
            <div>
            <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>ADD GRADES</h1>

            </div>
            <form onSubmit={handleSubmit}>
              <br />
              <br />
              <label htmlFor="module">Module:</label>
              <input
                type="text"
                id="module"
                name="module"
                className="input-field"

                value={newGrade.module || "" }
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="ca_mark">CA Mark:</label>
              <input
                type="integer"
                id="ca_mark"
                name="ca_mark"
                className="input-field"
                value={newGrade.ca_mark || "" }
                onChange={handleInputChange}
              />
              <br /><label htmlFor="exam_mark">Exam Mark:</label>
              <input
                type="integer"
                id="exam_mark"
                name="exam_mark"
                className="input-field"
                value={newGrade.exam_mark || "" }
                onChange={handleInputChange}
              />
              <br /><label htmlFor="cohort">Cohort:</label>
              <input
                type="text"
                id="cohort"
                name="cohort"
                className="input-field"
                value={newGrade.cohort || "" }
                onChange={handleInputChange}
              />
              <br /><label htmlFor="total_grade">Total Grade:</label>
              <input
                type="integer"
                id="total_grade"
                name="total_grade"
                className="input-field"
                value={newGrade.total_grade || "" }
                onChange={handleInputChange}
              /><br /><label htmlFor="student">Student ID:</label>
              <input
                type="text"
                id="student"
                name="student"
                className="input-field"
                value={newGrade.student || "" }
                onChange={handleInputChange}
              />
              <br />
              <button className="submit-button" type="submit">Create Grades</button>
            </form>
            <br />
          </div>
      );
  }
  
  return (
		<div>
      {displayForm()}
		</div>
	);
}

export default AddGrade;
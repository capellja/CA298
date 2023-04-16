import { useEffect, useState } from "react";


function FormModule () {
    const [newModule, setnewModule] = useState({ code: "", full_name: "" , delivered_to:[], ca_split:""});
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
        const { name, value } = event.target;
      
        if (name === "delivered_to") {
          const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
          setnewModule((prevState) => ({ ...prevState, delivered_to: selectedOptions }));
        } else {
          setnewModule((prevState) => ({ ...prevState, [name]: value }));
        }
      };
      


    const handleSubmit = async (event) => {
        event.preventDefault();

                // Check if id contains only uppercase letters and numbers
        if (!/^[A-Z0-9]+$/.test(newModule.code)) {
          alert("Shortcode must contain only uppercase letters and numbers.");
          return;
        }

        if (!Number.isInteger(parseInt(newModule.ca_split))) {
          alert("CA Split must be an integer.");
          return;
        }


  
        try {
          const response = await fetch("http://127.0.0.1:8000/api/module/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newModule),
          });
      
          if (response.ok) {
            // Module created successfully, reset form inputs and display success message
            setnewModule({ code: "", full_name: "" , delivered_to:[], ca_split:""});

            alert("Module created successfully!");
          } else {
            // Module creation failed, display error message
            const error = await response.text();
            alert(`Module creation failed: ${error}`);
          }
        } catch (error) {
          // Network error or other exception, display error message
          alert(`Module creation failed: ${error}`);
        }
    };

    return (
        <div>
          <div>
          <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>CREATE MODULE</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="code">Shortcode:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={newModule.code || "" }
              onChange={handleInputChange}
              className="input-field"

            />
            <br />
            <label htmlFor="full_name">Full Name:</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={newModule.full_name || "" }
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <label htmlFor="delivered_to">Delivered to :</label>
            <br></br>
            <select  className="input-field"id="delivered_to" name="delivered_to" value={newModule.cohort} onChange={handleInputChange} multiple>
            <option value="">Select a Cohort</option>
            {cohortOptions.map((cohort) => (
            <option key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>
            {cohort.id}
            </option>
             ))}
          </select>
          <br></br>
            <label htmlFor="ca_split">CA Split:</label>
            <input
              type="integer"
              id="ca_split"
              name="ca_split"
              value={newModule.ca_split || "" }
              onChange={handleInputChange}
              className="input-field"

            />
            <br />
            <button className="submit-button" type="submit">Create Module</button>
          </form>
          <br />
        </div>
    );
      
}

export default FormModule
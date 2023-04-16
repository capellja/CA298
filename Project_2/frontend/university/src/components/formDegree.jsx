import { useState }  from "react";


function FormDegree () {
    const [newDegree, setnewDegree] = useState({ shortcode: "", full_name: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;   // extracts name, value from target object; fields below
        setnewDegree((prevState) => ({ ...prevState, [name]: value })); // takes previous state, as to save data from other input, update newDegree with ([name]: value pair,
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/^[A-Z]+$/.test(newDegree.shortcode)) {
          alert("Shortcode must contain only uppercase letters.");
          return;
        }
        
      
        try {
          const response = await fetch("http://127.0.0.1:8000/api/degree/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDegree),
          });
      
          if (response.ok) {
            // Module created successfully, reset form inputs and display success message
            setnewDegree({ code: "", full_name: "" });
            alert("Degree created successfully!");
          } else {
            // Module creation failed, display error message
            const error = await response.text();
            alert(`Degree creation failed: ${error}`);
          }
        } catch (error) {
          // Network error or other exception, display error message
          alert(`Degree creation failed: ${error}`);
        }
    };

    return (
        <div>
          <div>
          <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>CREATE DEGREE</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="full_name">Full Name: </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={newDegree.full_name || "" }
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <label htmlFor="shortcode">Short Code: </label>
            <input
              type="text"
              id="shortcode"
              name="shortcode"
              value={newDegree.shortcode || "" }
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <button type="submit" className="submit-button">Create Degree</button>
          </form>
          <br />
        </div>
    );
      
}

export default FormDegree
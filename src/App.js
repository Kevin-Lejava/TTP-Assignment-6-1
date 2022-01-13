import './App.css';
import { Fragment } from 'react';
import React, { useState } from 'react'

function App() {

  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState([]);
  console.log(zipcode);

  const getCities = (event, zipcode) => {
    event.preventDefault();
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipcode}`)
      .then((response) => {
        console.log(response)
        return response.json();
      }).then((data) => {
        console.log(data)
        setData(data);
      }).catch((err) => {
        console.error(err)
      })
  }

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <Fragment>
          <form>
            <label>
              Zipcode:
              <input type="text" name="zipcode" onChange={(e) => setZipcode(e.target.value)} />
            </label>
            <input type="submit" value="Submit" onClick={(e) => getCities(e, zipcode)} />
          </form>

        </Fragment>

        {data.map((element) => {
          return (

            <div className="card">
              <h3>{element.City}</h3>
              <ul>
                <li className="list-group-item">State: {element.State}</li>
                <li className="list-group-item">Location: {element.Lat}, {element.Long}</li>
                <li className="list-group-item">Population(esitmated): {element.EstimatedPopulation}</li>
                <li className="list-group-item">Total Wages: {element.TotalWages}</li>
              </ul>
              <br></br>
            </div>

          )
        })}

      </header>



    </div>
  );
}

export default App;

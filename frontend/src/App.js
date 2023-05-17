import React, { useState, useEffect } from "react";
import "./APP.css";
import Axios from "axios";
import Comp from "./Comp";

function App() {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState(0);
  const [Phone, setPhone] = useState(0);
  //
  const [UPName, setNameUP] = useState("");
  const [UPAge, setAgeUp] = useState(0);
  const [UPPhone, setPhoneUP] = useState(0);
  //
  const [Namelist, setNameslist] = useState([]);
  const [editid, setEditID] = useState(null);

  // selecting an edit with id
  function Select(itemid) {
    setEditID(itemid);
    console.log(itemid);
  }

  // this this add an student information
  const submit = () => {
    Axios.post("http://localhost:3001/api/insert", {
      Name: Name,
      Age: Age,
      Phone: Phone,
    }).then(() => {
      console.log("succesfully inserted");
    });
  };

  // this edit on id

  const edit = () => {
    Axios.post("http://localhost:3001/api/edit", {
      Id: editid,
      UPName: UPName,
      UPAge: UPAge,
      UPPhone: UPPhone,
    })
      .then(alert("succesfully updated"))
      .catch((error) => "Not Updated  " + error);
  };

  // Deleting the Id values
  const remove = (id) => {
    Axios.post("http://localhost:3001/api/remove", {
      Id: id,
    })
      .then(<p>success fully deleted</p>)
      .catch((error) => "Not deleted  " + error);
  };

  //this is geting datafrom json data through node.js //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/api/get");
        setNameslist(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const refreshInterval = setInterval(fetchData, 2000); // Refresh data every 2 seconds

    return () => {
      clearInterval(refreshInterval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div className="appcontainer">
      {/* // Adding Data to sql // */}
      <h1>Enter to store in SQL</h1>

      <div className="inputs">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="PhoneNumber"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <br />
        <button
          onClick={submit}
          type="button"
        >
          submit
        </button>
      </div>
      <br />
      <br />

      {/* this is an 
          tabel with editing and deleting functionalty
       */}

      <h1>This table is shown by MYSQL server</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>PhoneNumber</th>
            <th>Actions</th>
          </tr>
        </thead>

        {Namelist.map((item) => {
          return (
            <tbody key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td onClick={() => Select(item.id)}>
                  {editid !== item.id ? (
                    <td>{item.name}</td>
                  ) : (
                    <input
                      placeholder="Enter name"
                      onChange={(r) => {
                        setNameUP(r.target.value);
                      }}
                    />
                  )}
                </td>
                <td onClick={() => Select(item.id)}>
                  {editid !== item.id ? (
                    <td>{item.age}</td>
                  ) : (
                    <input
                      placeholder="Enter Age"
                      onChange={(r) => {
                        setAgeUp(r.target.value);
                      }}
                    />
                  )}
                </td>

                <td onClick={() => Select(item.id)}>
                  {editid !== item.id ? (
                    <td>{item.phone}</td>
                  ) : (
                    <input
                      placeholder="Enter PhoneNo"
                      onChange={(r) => {
                        setPhoneUP(r.target.value);
                      }}
                    />
                  )}
                </td>

                <td>
                  <input
                    key={item.id}
                    type="submit"
                    value="Update"
                    onClick={edit}
                  />
                  <input
                    type="submit"
                    value="Delete"
                    onClick={() => {
                      remove(item.id);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;

import React, { useState ,useEffect} from 'react';
import './APP.css'
import Axios from 'axios'

function App( ){

const [Name,setName] =useState("")
const [Age,setAge]=useState(0)
const [Namelist,setNameslist]=useState([])




const submit=()=>{
  Axios.post('http://localhost:3001/api/insert',{
  Name:Name,
  Age:Age}).then(()=>{
    console.log("succesfully inserted")
  })
}
  //this is geting datafrom json data through node.js //
  useEffect(()=>{
  Axios.get("http://localhost:3001/api/get").then((response)=>
  {
  setNameslist(response.data)
  })
},)
  return (
 <div className='appcontainer'>    
  {/* // Data input to sql // */}
   <h1>Enter to store in SQL</h1>

  <div className='inputs' >
    <input type="text" placeholder='Name' onChange={(r)=>{setName(r.target.value)}}/>
    <br/>
    <br/>
    <input type="text" placeholder='Age' onChange={(r)=>{setAge(r.target.value)}}/>
    <br/>
    <br/>
     <button onClick={submit} type="button">submit</button>
  </div>
<br/>
<br/>

<h1>This table is shown by MYSQL server</h1>
<table>  
  <thead>
    <tr>
    <th>Name</th>
     <th>Age</th>
     </tr>
  </thead>
   
{
  Namelist.map((value)=>{
    return(
      <tbody>
          <tr >
        <td>{value.name}</td>
        <td>{value.age}</td>
        </tr>
      </tbody>
    
     )
  })
} 
</table>
</div>
  )
}

export default App
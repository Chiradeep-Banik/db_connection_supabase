import styles from '../styles/Home.module.css'
import { useState } from 'react';

import client from '../config/db';
import { useEffect } from 'react';
import { useRef } from 'react';

const getData = async () => {
  let { data,error } = await client
  .from("testT")
  .select("*");

  return data;
};

export default function Home() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getData().then((dat)=>{
      setData(dat);
      console.log("dat",dat);
    });
  },[data]);
  

  const [ID,setID] = useState(0);
  const [Name,setName] = useState("");
  const [Age,setAge] = useState(0);

  const Submit=()=>{
    client.from("testT")
      .insert({id:ID,Name:Name,Age:Age})
      .then((error)=>{
        if(error.status==201){
          alert("Success");
        }else{
          alert("Failure");
        }
        console.log(error);
      });
    setID(0);
    setAge(0);
    setName("");
  }

  const ref = useRef(null);
  const Delete = (id)=>{
    console.log("id : ",id);
    client
      .from('countries')
      .delete()
      .eq('id', id)
      .then((err)=>{
        console.log(err);
      })
  }
  
  return (
    <div className={styles.container}>
      <input type="number"
        id="id"
        placeholder="ID"
        value={ID}
        onChange={(e)=>{setID(+e.target.value)}}
      ></input>
      <input type="text"
        id="Name"
        placeholder="Name"
        value={Name}
        onChange={(e)=>{setName(e.target.value)}}
      ></input>
      <input type="number"
        id="Age"
        placeholder="Age"
        value={Age}
        onChange={(e)=>{setAge(+e.target.value)}}
      ></input>

      <button onClick={Submit}>SUBMIT</button>
      <br></br>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>DELETE</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => {
      return (
        <tr key={item.id}>
          <td>{ item.id }</td>
          <td>{ item.Name }</td>
          <td>{ item.Age }</td>
          <td>
            <button id={item.id} onClick={Delete(item.id)} >DELETE</button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>     
    </div>
  )
}

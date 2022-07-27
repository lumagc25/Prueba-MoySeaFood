import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const UserList = () => {
    const [usersData, setUsersData] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        callToApi();
    }, []);

    const callToApi = async () => {
      try
      {
        const url = `https://jsonplaceholder.typicode.com/users`;
        const res = await axios.get(url);
        setUsersData(res.data)

      }catch(error)
      {
        console.log(error);
      }
    }

    const searchFilter = () => {
      return usersData.filter((user) => 
      user.name.toLowerCase().includes(searchName) ||
      user.username.toLowerCase().includes(searchName) ||
      user.email.toLowerCase().includes(searchName) ||
      user.phone.toLowerCase().includes(searchName)
      )
    }

    console.log(usersData.filter(user=>user.name.toLowerCase().includes("Ervin")));

    return <section>
      <h1>Lista de usuarios</h1>
      <input type="text" placeholder="filter...." onChange={(ev) => setSearchName(ev.target.value) } />
      <div>
        {
          searchFilter().map((user, index) => (
            <ul key={index}>
              <li>{user.id}</li>
              <li>{user.name}</li>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>{user.phone}</li>
              <Link to={`/userDetail/${user.id}`}>
                <button>Ver mas detalles</button>
              </Link>
            </ul>
          ))
        }
      </div>
    </section>
}

export default UserList;
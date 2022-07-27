import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import "./User.css";

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

    return <section>
      <h1 className="h1">User list</h1>
      <div className="container">
        <input className="form-control" type="text" id="search" placeholder="filter...." onChange={(ev) => setSearchName(ev.target.value) } />
      </div>
      <div className="container-table">
        <table className="table table-bordered">
          <caption>Users</caption>
          <tbody>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">More details</th>
            </tr>
            {
              searchFilter().map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/userDetail/${user.id}`}>
                      <button className="btn btn-info">See more</button>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
}

export default UserList;
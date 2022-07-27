import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./User.css";

const UserDetail = () => {
    const location = useLocation();
    const urlId = location.pathname.split("/")[2];
    const [userData, setUserData] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");

    useEffect(() => {
        callToApi();
    }, []);

    const callToApi = async () => {
      const toArray = [];
      try
      {
        const url = `https://jsonplaceholder.typicode.com/users/${urlId}`;
        const res = await axios.get(url);
        toArray.push(res.data);
        setUserData(toArray)

      }catch(error)
      {
        console.log(error);
      }
    }

    function editUser() {
      const updateList = [];
      axios
        .patch(`https://jsonplaceholder.typicode.com/users/${urlId}`, {
          email: userEmail,
          phone: userPhone
        })
        .then((response) => {
          updateList.push(response.data);
          setUserData(updateList);
        });
    }

    const handleSubmit = (ev) => {
      ev.preventDefault();
      editUser()
      ev.target.reset()
    }

    return <section>
        <h1 className="h1">User data</h1>
        <div className="list">
        {
          userData.map((user, index) => (
            <ul className="list-group" key={index}>
              <li className="list-group-item"><b>Name:</b> {user.name}</li>
              <li className="list-group-item"><b>Username:</b> {user.username}</li>
              <li className="list-group-item"><b>Email:</b> {user.email}</li>
              <ul className="list-group">
                <li className="list-group-item">Address</li>
                <li className="list-group-item"><b>Street:</b> {user.address.street}</li>
                <li className="list-group-item"><b>Suite:</b> {user.address.suite}</li>
                <li className="list-group-item"><b>City:</b> {user.address.city}</li>
                <li className="list-group-item"><b>Zipcode:</b> {user.address.zipcode}</li>
              </ul>
              <li className="list-group-item"><b>Phone:</b> {user.phone}</li>
              <li className="list-group-item"><b>Website</b> {user.website}</li>
              
              <ul className="list-group">
                <li className="list-group-item">Company</li>
                <li className="list-group-item"><b>Name:</b> {user.company.name}</li>
                <li className="list-group-item"><b>CatchPhrase:</b> {user.company.catchPhrase}</li>
                <li className="list-group-item"><b>bs:</b> {user.company.bs}</li>
              </ul>
            </ul>
          ))
        }
        </div>
        <div className="container">
          <h3>Change email and phone</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="email">Email:</label><br />
          <input className="form-control" type="email" name="email" id="email" value={userEmail} onChange={(ev) => setUserEmail(ev.target.value)} /> <br />
          <label htmlFor="phone">Phone:</label><br />
          <input className="form-control" type="text" name="phone" id="phone" value={userPhone} onChange={(ev) => setUserPhone(ev.target.value)}/> <br />
          
          <button className="btn btn-primary" type="submit">Update</button>
          
          
          </form>
        </div>
    </section>
}

export default UserDetail;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

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
        <h1>Datos del usuario</h1>
        {
          userData.map((user, index) => (
            <div key={index}>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.address.street}</p>
              <p>{user.address.suite}</p>
              <p>{user.address.city}</p>
              <p>{user.address.zipcode}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
              <p>{user.company.name}</p>
              <p>{user.catchPhrase}</p>
              <p>{user.bs}</p>
              <h1>Change email and phone</h1>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="email" name="email" id="email" value={userEmail} onChange={(ev) => setUserEmail(ev.target.value)} />
                <input type="text" name="phone" id="phone" value={userPhone} onChange={(ev) => setUserPhone(ev.target.value)}/>
                <button type="submit">Editar</button>
              </form>
            </div>
          ))
        }
    </section>
}

export default UserDetail;
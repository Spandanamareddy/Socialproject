import '../../App.css';

import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    UserId: '',
    FirstName: '',
    LastName: '',
    password: ''
  });

  const { UserId, FirstName, LastName, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/register",
      {
        UserId,
        FirstName,
        LastName,
        password
      },
      "POST")
      .then((data) => {
        if (!data.message) {
          console.log(data)
          navigate("/login")
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="App">
      <div className="container ">
  <div className="row m-4">
    <div className="col-md-6 col-sm-12 bg-custom none">
      <h1 className="text-center pt-3">Register Form</h1>
    </div>
    <div className="col-md-6 col-sm-12 bg-custom-form">
      <form className="p-3" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="UserId">User Id</label>
          <input
                  type="text"
                  className="form-control"
                  id="UserId"
                  name='UserId'
                  onChange={onChange}
                  value={UserId}
                  required
                />
        </div>
        <div className="form-group">
          <label htmlFor="FirstName">First Name</label>
          <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name='FirstName'
                  onChange={onChange}
                  value={FirstName}
                  required
                />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name</label>
          <input
              type="text"
              className="form-control"
              id="LastName"
              name='LastName'
              onChange={onChange}
              value={LastName}
              required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              onChange={onChange}
              value={password}
              required />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-custom mb-3 mt-3">
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}

export default RegisterForm;
import '../../App.css';
import { fetchData } from "../../main.js";
import { useContext } from "react";
import UserContext from "../../Context/userContext.js";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const navigate = useNavigate();

  const {user, updateUser} = useContext(UserContext);

  const {UserId, password} = user;  

  const onChange = (e) => updateUser(e.target.name, e.target.value)

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/login",
      {
        UserId,
        password
      },
      "POST")
      .then((data) => {
        console.log(data);
        if (!data.message) {
          updateUser("authenticated", true)
          fetchData("/post/viewpost",
            {
              UserId
            },
            "POST")
            .then((_data) => {
              console.log(_data);
              if (!_data.message) {
                navigate("/profile", { state: { name: UserId, data: _data } });
              }
            })
            .catch((error) => {
              console.log(error)
            })
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
      <h1 className="text-center pt-3">Login</h1>
    </div>
    <div className="col-md-6 col-sm-12 bg-custom-form">

      <form className="p-3" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="UserId">User Id</label>
          <input
              type="text"
              className="form-control"
              name='UserId'
              id='UserId'
              onChange={onChange}
              value={UserId}
              required
            />
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
              required
            />
        </div>
        <button type="submit" className="btn btn-custom mb-3 mt-3">
          LOGIN
        </button>
      </form>

    </div>
  </div>
</div>
    </div>
  );
}

export default LoginForm;

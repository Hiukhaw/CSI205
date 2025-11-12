import Form from "react-bootstrap/Form";
import "../Login/login.css";
import { verifyUser } from "../../Data/user";
import { useRef } from "react";
const Login = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();

  return (
    <div className="Login-wrapper ">
      <div className="Login-container">
        <h1 className="mb-5 ">LOGIN</h1>
        <div className="block-text">
          <Form.Label htmlFor="Username">Username</Form.Label>
          <Form.Control className="text-blur"
            type="text"
            id="username"
            placeholder="user"
            //style={{ textAlign: "center" }}
            ref={userRef}
          />
          <Form.Label htmlFor="Password">Password</Form.Label>
          <Form.Control className="text-blur"
            type="password"
            id="password"
            placeholder="pass"
            //style={{ textAlign: "center" }}
            ref={passRef}
          />
        </div>
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            const user = userRef.current.value.trim();
            const pass = passRef.current.value.trim();

            userRef.current.value = "";
            passRef.current.value = "";
            const userInfo = verifyUser(user, pass);
            if (userInfo === null) {
              alert("Wrong password or username");
              userRef.current.focus();
            } else {
              setToken(userInfo.token);
              setRole(userInfo.role);
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

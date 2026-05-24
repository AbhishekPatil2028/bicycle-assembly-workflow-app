import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  registerUser
} from "../services/registerService";


function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response =
        await registerUser(

          email,
          password
        );

      setMessage(
        response.message
      );

      setError("");

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.detail
        || "Registration failed"
      );
    }
  };


  return (

    <div>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <div>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <br />

        <div>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <br />

        <button type="submit">

          Register

        </button>

      </form>

      <p>{message}</p>

      <p>{error}</p>

    </div>
  );
}

export default RegisterPage;
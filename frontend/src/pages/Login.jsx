import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import useApi from "../services/useApi";

import "../styles/Login.css";

export default function Login() {
  const api = useApi();
  const { setUser } = useUser();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginInput = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  function handleLogin() {
    api
      .post("/login", { login, password })
      .then((res) => {
        const { user, token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser({
          id: user.id,
          login: user.login,
        });
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-form">
          <label>
            Identifiant
            <input
              type="text"
              name="login"
              onChange={handleLoginInput}
              value={login}
            />
          </label>
          <label>
            Mot de Passe
            <input
              type="password"
              name="password"
              onChange={handlePasswordInput}
              value={password}
            />
          </label>
          <button type="button" onClick={handleLogin}>
            Se Connecter
          </button>
        </div>
        <Link to="/">Retourner sur le site</Link>
      </div>
    </div>
  );
}

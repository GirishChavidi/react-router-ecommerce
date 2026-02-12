import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("login"); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  // ===== LOGIN =====
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError(" Invalid email or password");
      return;
    }

    login(email, password);
    navigate(from, { replace: true });
  };

  // ===== SIGNUP =====
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      setError(" Account already exists. Please login.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setMode("login");
    setError(" Account created. Please login.");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="login-page">

      {/* ===== TITLE ===== */}
      <h1 className="login-title">G-MART</h1>
      <p className="login-sub">Online Shopping Store</p>

      <form
        onSubmit={mode === "login" ? handleLogin : handleSignup}
        className="login-form"
      >
        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        )}

        {error && <p className="error-text">{error}</p>}

        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <p
          className="switch-text"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
          }}
        >
          {mode === "login"
            ? "New user? Create account"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Login;






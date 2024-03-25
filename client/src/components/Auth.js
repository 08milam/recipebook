import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmpassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies);

  console.log(email, password, confirmPassword);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure passwords match");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <h1>Recipe Book</h1>
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
        </form>
        <div className="auth-option">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(133, 133, 133)",
            }}
          >
            Sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(133, 133, 133)",
            }}
          >
            Login
          </button>
          
        </div>
        <div className="error-box">
        {error && (
            <p>
              <span class="error-message">{error}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

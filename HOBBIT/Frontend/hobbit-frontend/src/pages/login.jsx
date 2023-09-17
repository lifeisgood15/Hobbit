import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateEmail } from "../commonJS/auth";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    emailInput: false,
    passwordInput: false,
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (e.target.name === "emailInput") {
      setValidationErrors((prev) => {
        return { ...prev, emailInput: !validateEmail(e.target.value) };
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.emailInput || !formData.passwordInput) {
      setValidationErrors({
        emailInput: !validateEmail(formData.emailInput),
      });
    } else if (
      !validationErrors.emailInput &&
      !validationErrors.passwordInput
    ) {
      console.log("Allow login");
      const payload = {
        email: formData.emailInput,
        password: formData.passwordInput,
      };
      const response = await fetch("http://localhost:8000/user/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.error) {
        alert(responseData.error);
      } else {
        localStorage.setItem("user", JSON.stringify(responseData));
        navigate("/");
      }
    }
  };


  const goToRegister = () => {
    navigate("/new-user");
  };
  return (
    <>
      <form>
        <div className="form-group mx-5 my-5">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="emailInput"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          {validationErrors.emailInput && (
            <div className="text-danger">Invalid email.</div>
          )}
        </div>
        <div className="form-group mx-5 y-5">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="passwordInput"
            placeholder="********"
            onChange={handleChange}
          />
          {validationErrors.passwordInput && (
            <div className="text-danger">Invalid password.</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-button my-3 mx-5"
          onClick={handleRegister}
        >
          Login
        </button>
      </form>
      <div className="mx-5">
        New user?
        <button
          type="submit"
          className="btn other-option-button my-5 mx-2"
          onClick={goToRegister}
        >
          Register
        </button>
      </div>
    </>
  );
}
export default Login;

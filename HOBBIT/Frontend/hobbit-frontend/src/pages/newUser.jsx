import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validateName, validatePassword } from "../commonJS/auth";
function NewUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    emailInput: false,
    nameInput: false,
    passwordInput: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (e.target.name === "nameInput") {
      setValidationErrors((prev) => {
        return { ...prev, nameInput: !validateName(e.target.value) };
      });
    } else if (e.target.name === "passwordInput") {
      setValidationErrors((prev) => {
        return { ...prev, passwordInput: !validatePassword(e.target.value) };
      });
    } else if (e.target.name === "emailInput") {
      setValidationErrors((prev) => {
        return { ...prev, emailInput: !validateEmail(e.target.value) };
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.nameInput ||
      !formData.emailInput ||
      !formData.passwordInput
    ) {
      setValidationErrors({
        emailInput: !validateEmail(formData.emailInput),
        nameInput: !validateName(formData.nameInput),
        passwordInput: !validatePassword(formData.passwordInput),
      });
    } else if (
      !validationErrors.emailInput &&
      !validationErrors.nameInput &&
      !validationErrors.passwordInput
    ) {
      const payload = {
        name: formData.nameInput,
        email: formData.emailInput,
        password: formData.passwordInput,
      };
      const response = await fetch("http://localhost:8000/user/register-user", {
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
        <div className="form-group mx-5 my-5">
          <label htmlFor="nameInput">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="nameInput"
            placeholder="Siya A"
            onChange={handleChange}
          />
          {validationErrors.nameInput && (
            <div className="text-danger">Invalid name.</div>
          )}
        </div>
        <div className="form-group mx-5 y-5">
          <label htmlFor="passwordInput">
            Password (length 8, must contain a number and special character)
          </label>
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
          className="btn btn-primary submit-button my-5 mx-5"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </>
  );
}
export default NewUser;

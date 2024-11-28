import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LOGIN_URL } from "../../../constants/constant";
import styles from "./Login.module.css";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [error, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName.length === 0) {
      setErrors("Please enter username");
      return;
    }
    if (userOTP.length !== 4) {
      setErrors("OTP should be 4 digits.");
      return;
    }

    try {
      const userData = {
        username: userName,
        otp: userOTP,
      };

      const createUser = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const res = await createUser.json();

      if (res.token) {
        sessionStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors("Invalid Credentials!(Wrong Otp)");
      console.log(error);
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUSerOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setUserOTP(value);
    }
  };

  return (
    <div className={styles["login__container"]} style={{}}>
      Login Page
      <form className={styles["form__container"]}>
        <label htmlFor="">
          <div className={styles["form__label-text"]}>Username</div>
          <input
            type="text"
            value={userName}
            name="username"
            onChange={handleUserNameChange}
            maxLength={30}
          />
        </label>

        <label htmlFor="">
          <div className={styles["form__label-text"]}>OTP</div>
          <input
            type="number"
            name="userotp"
            value={userOTP}
            onChange={handleUSerOtpChange}
          />
        </label>

        {error && <p className={styles["error-message"]}>{error}</p>}
        <button className={styles["login__cta"]} onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

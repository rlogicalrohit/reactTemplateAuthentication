import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './Login.css';

const Login = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Your existing useEffect code for handling click events
    const wrapper = document.querySelector(".wrapper");
    const signupHeader = document.querySelector(".signup header");
    const loginHeader = document.querySelector(".login header");

    const handleLoginClick = () => {
      wrapper.classList.add("active");
    };

    const handleSignupClick = () => {
      wrapper.classList.remove("active");
    };

    loginHeader.addEventListener("click", handleLoginClick);
    signupHeader.addEventListener("click", handleSignupClick);

    // Cleanup function to remove event listeners
    return () => {
      loginHeader.removeEventListener("click", handleLoginClick);
      signupHeader.removeEventListener("click", handleSignupClick);
    };
  }, []);

  const signupSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignupSubmit = (values) => {
    console.log("Signup data:", values);
    // Here you can add logic to store signupData or send it to a backend server and handle with axios 
  };

  const handleLoginSubmit = (values) => {
    console.log("Login data:", values);
    // Here you can add logic to store loginData or send it to a backend server and handle with axios
  };

  const signupFormik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: handleSignupSubmit,
  });

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleLoginSubmit,
  });

  return (
    <>
      <section className="wrapper">
        <div className="form signup">
          <header>Signup</header>
          <form onSubmit={signupFormik.handleSubmit}>
            <input type="text" name="fullName" placeholder="Full name" value={signupFormik.values.fullName} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} />
            {signupFormik.touched.fullName && signupFormik.errors.fullName ? (
              <div className="error">{signupFormik.errors.fullName}</div>
            ) : null}
            <input type="text" name="email" placeholder="Email address" value={signupFormik.values.email} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} />
            {signupFormik.touched.email && signupFormik.errors.email ? (
              <div className="error">{signupFormik.errors.email}</div>
            ) : null}
            <input type="password" name="password" placeholder="Password" value={signupFormik.values.password} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} />
            {signupFormik.touched.password && signupFormik.errors.password ? (
              <div className="error">{signupFormik.errors.password}</div>
            ) : null}
            <input type="submit" value="Signup" />
          </form>
        </div>

        <div className="form login">
          <header>Login</header>
          <form onSubmit={loginFormik.handleSubmit}>
            <input type="text" name="email" placeholder="Email address" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
            {loginFormik.touched.email && loginFormik.errors.email ? (
              <div className="error">{loginFormik.errors.email}</div>
            ) : null}
            <input type="password" name="password" placeholder="Password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
            {loginFormik.touched.password && loginFormik.errors.password ? (
              <div className="error">{loginFormik.errors.password}</div>
            ) : null}
            <input type="submit" value="Login" />
          </form>
        </div>

      </section>
    </>
  )
}

export default Login;

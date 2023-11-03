// src/components/Login.js
"use client";
import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailError(!emailPattern.test(inputEmail));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // Check if email is valid before proceeding
    if (!email || !password) {
      return;
    }
    if (emailError) {
      // Handle email validation error
      return;
    }
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log("");
        toast.error("Invalid Credentials");
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.success("Login Successful");
      router.replace("users");
    } catch (error) {
      console.log("🚀 ~ file: LoginForm.js:39 ~ handleLogin ~ error:", error);
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col items-center mb-2">
        <LockOutlinedIcon style={{ fontSize: "30px" }} />
        <Typography variant="h5">Login</Typography>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Invalid email address" : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mb-2"
          />
          <Button
            className="bg-blue-600"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            {loading ? "Loging in..." : "Login"}
          </Button>
        </form>
      </div>
      <span>
        {"Dont have an account?"}{" "}
        <Link className="text-blue-600 underline" href={"/signup"}>
          Register Now
        </Link>
      </span>
    </div>
  );
}

export default LoginForm;

// src/components/Login.js
"use client";
import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
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
    if (emailError) {
      // Handle email validation error
      return;
    }

    // Implement your authentication logic here
    console.log("Email: ", email);
    console.log("Password: ", password);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log("Invalid Credentials");
        return;
      }
      router.replace("users");
    } catch (error) {
      console.log("🚀 ~ file: LoginForm.js:39 ~ handleLogin ~ error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex flex-col items-center mb-2">
        <LockOutlinedIcon style={{ fontSize: "50px" }} />
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
          />
          <Button
            className="bg-blue-600 mt-2"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
      <span>
        Don't have an account?{" "}
        <Link className="text-blue-600 underline" href={"/signup"}>
          Register Now
        </Link>
      </span>
    </Container>
  );
}

export default LoginForm;

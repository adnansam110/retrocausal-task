"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [countries] = useState(["USA", "Canada", "UK"]); // Example countries
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    // Set states based on the selected country
    if (event.target.value === "USA") {
      setStates(["New York", "California", "Texas"]);
    } else if (event.target.value === "Canada") {
      setStates(["Ontario", "Quebec", "British Columbia"]);
    } else if (event.target.value === "UK") {
      setStates(["England", "Scotland", "Wales"]);
    }
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    // Set cities based on the selected state
    if (event.target.value === "New York") {
      setCities(["New York City", "Buffalo", "Albany"]);
    } else if (event.target.value === "California") {
      setCities(["Los Angeles", "San Francisco", "San Diego"]);
    } // Add more cities as needed
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Implement your signup logic here
    try {
      const res = await axios.post("api/signup", {
        username,
        password,
        email,
        country,
        state,
        city,
      });
      const form = e.target;
      form.reset();
      router.push("/");
    } catch (err) {
      console.log("🚀 ~ file: page.js:60 ~ handleSignUp ~ err:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex flex-col items-center mb-2">
        <LockOutlinedIcon style={{ fontSize: "50px" }} />
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              onChange={handleCountryChange}
              label="Country"
            >
              {countries.map((countryName) => (
                <MenuItem key={countryName} value={countryName}>
                  {countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>State</InputLabel>
            <Select value={state} onChange={handleStateChange} label="State">
              {states.map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="City"
            >
              {cities.map((cityName) => (
                <MenuItem key={cityName} value={cityName}>
                  {cityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className="bg-blue-600 mt-2"
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
      <span>
        Already have an account?{" "}
        <Link className="text-blue-600 underline" href={"/"}>
          Login
        </Link>
      </span>
    </Container>
  );
}

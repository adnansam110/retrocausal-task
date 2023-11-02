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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setSatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setState("");
    setCity("");
    // Set states based on the selected country
    const updatedStates = statesList.filter(
      (state) => state.country === event.target.value
    );
    setStates(updatedStates);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    setCity("");
    // Set cities based on the selected state
    const updatedCities = citiesList.filter(
      (city) => city.state === event.target.value
    );
    setCities(updatedCities);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Implement your signup logic here
    if (emailError) {
      // Handle email validation error
      return;
    }
    try {
      setLoading(true);
      await axios.post("api/signup", {
        username,
        password,
        email,
        country,
        state,
        city,
      });
      const form = e.target;
      form.reset();
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log("🚀 ~ file: page.js:60 ~ handleSignUp ~ err:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
    getCities();
    getStates();
  }, []);

  const getCountries = async () => {
    try {
      const res = await axios.get("api/country");
      setCountriesList(res.data.data);
    } catch (error) {
      console.log("🚀 ~ file: SignupForm.js:82 ~ getCountries ~ error:", error);
    }
  };
  const getStates = async () => {
    try {
      const res = await axios.get("api/state");
      setSatesList(res.data.data);
    } catch (error) {
      console.log("🚀 ~ file: SignupForm.js:82 ~ getCountries ~ error:", error);
    }
  };
  const getCities = async () => {
    try {
      const res = await axios.get("api/city");
      setCitiesList(res.data.data);
    } catch (error) {
      console.log("🚀 ~ file: SignupForm.js:82 ~ getCountries ~ error:", error);
    }
  };

  const handleEmailChange = (value) => {
    const inputEmail = value;
    setEmail(value);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailError(!emailPattern.test(inputEmail));
  };

  return (
    <Container
      className="h-screen flex flex-col justify-center items-center"
      component="main"
      maxWidth="xs"
    >
      <div className="flex flex-col items-center mb-2">
        <LockOutlinedIcon style={{ fontSize: "30px" }} />
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            value={email}
            error={emailError}
            helperText={emailError ? "Invalid email address" : ""}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
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

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              onChange={handleCountryChange}
              label="Country"
            >
              {countriesList.map((country) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {!!country && (
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>State</InputLabel>
              <Select value={state} onChange={handleStateChange} label="State">
                {states.map((state) => (
                  <MenuItem key={state.name} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {!!country && !!state && (
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>City</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            className="bg-blue-600 mt-2"
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
      <span className="text-start">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" href={"/"}>
          Login
        </Link>
      </span>
    </Container>
  );
}

import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "../images/loginImg.svg";

import FacebookImg from "../images/Facebook.svg";
import GoogleImg from "../images/Google.svg";
import logo from "../images/logo.svg";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { IconButton } from "@mui/material";
import axios from 'axios';
import { CONFIG } from "../Utils/config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { set } from 'date-fns';
import { color } from '@mui/system';

// import Stack from '@mui/material/Stack';

const theme = createTheme();

export default function ResetPassword(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailFlag, setEmailFlag] = useState(false);
  const [cPasswordFlag, setCPasswordFlag] = useState(false);
  const [passowordFormat, setPasswordFormat] = useState(false);
  const [requiredFlag, setRequiredFlag] = useState(false);
  const [error, setError] = useState('');
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
 const navigate = useNavigate();
 
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }


  const checkPassword = (password) => {
    var format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (password.match(format)) {
      return true;
    }
    else {
      return false;
    }
  }

  const onTextChange = (e) => {
    setError('')
    if (email !== "" && emailFlag === false && passowordFormat === false && cPasswordFlag === false) {
      setRequiredFlag(false)
    }
    switch (e.target.name) {
      case 'email':
        let emailV = validateEmail(e.target.value);
        if (emailV === false) {
          setEmailFlag(true);
           setEmail(e.target.value);
        } else {
          setEmailFlag(false)
          setEmail(e.target.value);
        }
        break;
      case 'password':
        let format = checkPassword(e.target.value);
        if (format === false) {
          setPasswordFormat(true);
          setPassword(e.target.value);
        }
        else {
          setPasswordFormat(false);
          setPassword(e.target.value);
        }
        break;
      case 'confirmPassword':

        if (password !== e.target.value) {
          setConfirmPassword(e.target.value)
          setCPasswordFlag(true);
        }
        else {
          setConfirmPassword(e.target.value)
          setCPasswordFlag(false);
        }

        break;
      default:
        break;
    }
  }


  const handleSubmit = () => {

    if (emailFlag === false && cPasswordFlag === false && passowordFormat === false && confirmPassword !== "") {
     
      const data = {
        "email": email,
        "password": password,
        "token": token.split(" ").join("+")
      }
      axios.post(CONFIG.API_URL + 'Account/ForgotResetPassword', data).then(res => {
        if (res.status === 200) {
          setRequiredFlag(false)
          alert("Password reset successfully.")
          navigate('/login');
        }
      })
        .catch((err) => {
          alert(err.response.data.error)
          setError(err.response.data.error)
        });
    }
    else {


    }


  };

  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square style={{ padding: "20px" }}>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <Box
              // component="form"
              noValidate
              //  onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              style={{ width: "100%" }}
            >
              <Grid item>
                <Link to="/">
                  <IconButton style={{ marginLeft: "-50px" }}>
                    <ArrowCircleLeftOutlinedIcon style={{ fontSize: "40px", color: "grey" }} />
                  </IconButton>
                </Link>
                <img
                  src={logo}
                  alt="logo"
                  class="img-responsive"
                  style={{ width: 70, height: 70 }}
                />
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography
                    component="h1"
                    variant="h4"
                    style={{ fontWeight: "bold", paddingTop: 20 }}
                  >
                    ResetPassword
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              {requiredFlag === true ? <p style={{ color: "red" }}>Please fill all the required fields.</p> : ''}
              <p style={{ color: "red" }}>{error}</p>

              <TextField

                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                name="email"
                autoComplete="email"
                onChange={(e) => onTextChange(e)}
                autoFocus
                inputProps={{ style: { fontSize: 12 } }}
              />
              {emailFlag === true ? <p style={{ color: "red" }}>Please enter valid email.</p> : ''}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onTextChange(e)}
                inputProps={{ style: { fontSize: 12 } }}
              />
              {passowordFormat === true ? <p style={{ color: "red" }}>Must contain at least one number and one uppercase and lowercase letter and at least 7 or more characters.</p> : ''}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirm Password"
                value={confirmPassword}
                type="password"
                id="confirm password"
                autoComplete="current-password"
                onChange={(e) => onTextChange(e)}
                inputProps={{ style: { fontSize: 12 } }}
              />
              {cPasswordFlag === true ? <p style={{ color: "red" }}>Doesn't match password.</p> : ''}

              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                style={{ backgroundColor: "#0d4a43", color: "white", height: 50, alignItems: "center" }}
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography style={{ fontSize: 12, fontWeight: "bold" }}>Submit</Typography>
              </Button>

            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}


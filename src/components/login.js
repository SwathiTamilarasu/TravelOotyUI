import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from 'axios';
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
import { CONFIG } from "../Utils/config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../Utils/loader';

// import Stack from '@mui/material/Stack';

const theme = createTheme();

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFlag, setEmailFlag] = useState(false);
  const [requiredFlag, setRequiredFlag] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();




  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
  }

  const onTextChange = (e) => {
    setError('');
    if (email !== "" && password !== "") {
      setRequiredFlag(false);
    }
    switch (e.target.name) {
      case 'email':
        let emailV = ValidateEmail(e.target.value);
        if (emailV === false) {
          setEmailFlag(true);
          console.log(emailFlag)
          setEmail(e.target.value);
        } else {
          setEmailFlag(false)
          setEmail(e.target.value);
        }
        break;
      case 'password':
        setPassword(e.target.value)
        break;

      default:
        break;
    }
  }

  const handleSubmit = () => {


    if (email !== "" && password !== "") {
      if (emailFlag === false) {
        const data = {
          "email": email,
          "password": password
        }
        setIsLoading(true)
        axios.post(CONFIG.API_URL + 'Account/authenticate', data).then(res => {
          setRequiredFlag(false)
          setIsLoading(false)
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('userName', res.data.firstName);
            localStorage.setItem('isSuperAdmin', res.data.isSuperAdmin);
            localStorage.setItem('isAdmin', res.data.isAdmin);
            localStorage.setItem('isEmployee', res.data.isEmployee)
            localStorage.setItem('isPropertyOwner', res.data.isPropertyOwner)            
            if (res.data.isSuperAdmin || res.data.isEmployee) {
              navigate('/mainscreenadmin/overviewadmin');
            } else {
              navigate('/');
            }

          }





        })
          .catch((err) => {
            setIsLoading(false)
            console.log(err);
            setError(err.response.data.error)

          });
      }
      else {

      }
    }
    else {
      setRequiredFlag(true);
    }




  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loader isLoading={isLoading} />}
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

              sx={{ mt: 1 }}
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
                    variant="h3"
                    style={{ fontWeight: "bold", paddingTop: 20 }}
                  >
                    Login to your account!
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <br />
              <br />


              {/* <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                  <img
                    src={GoogleImg}
                    alt="google"
                    class="img-responsive"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <img
                    src={FacebookImg}
                    alt="facebook"
                    class="img-responsive"
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid> */}
              <br />

              {requiredFlag === true ? <p style={{ color: "red" }}>Please fill all the reqired fields.</p> : ''}
              <p style={{ color: "red" }}>{error}</p>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                label="Email"
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
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link to="/forgotPassword">
              <span style={{float:"right",paddingTop:"8px",fontSize:"12px",fontWeight:"bold",color:"black"}}>Forgot Password ?</span>
              </Link>
             

              <Button
                // type="submit"
                onClick={handleSubmit}
                fullWidth
                style={{ backgroundColor: "#0d4a43", color: "white", height: 50, alignItems: "center" }}
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography style={{ fontSize: 12, fontWeight: "bold" }}>Login to Continue</Typography>
              </Button>

              <Grid container>

                <Grid item xs>

                  <Typography style={{ fontSize: 12 }}>Don't have an account?<Link to="/signup"><span style={{ color: "#0d4a43", fontWeight: "bold", cursor: "pointer" }}>Sign Up</span></Link></Typography>

                </Grid>

                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
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

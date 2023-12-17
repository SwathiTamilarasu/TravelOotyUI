import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Header from '../header';
import profile from "../../images/profile.png";
import booking from "../../images/booking.svg";
import acount from "../../images/acount.svg";
import message from "../../images/message.svg";
import help from "../../images/help.svg";
import { Avatar, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../../Utils/config";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  gridspace: {
    marginLeft: 180,
    marginRight: 180,
  },
  gly: {
    height: 300,
    overflow: "scroll"
  }
})

export default function Profile() {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);

  const userDetails = async () => {
    let userId = localStorage.getItem('userId');
    await axios.get(CONFIG.API_URL + 'Account/GetUserByIdAysnc?id=' + userId)
      .then(res => {

        console.log(res.data);
        // setUserData(res.data.firstName)
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {

    userDetails();
  }, [])
  return (
    <div>
      <Header />

      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ paddingTop: "60px" }}
        >
          <img
            src={userData?.imagePath === null ? profile : userData?.imagePath}
            alt="logo"
            class="img-responsive"
            style={{ width: 70, height: 70 }}
          />
          <p style={{ fontWeight: "bold", paddingTop: "10px" }}>{userData?.firstName === undefined ? '' : userData?.firstName} {userData?.lastName === undefined ? '' : userData?.lastName}</p>

          <p style={{ color: "#908e8e", fontSize: "10px", marginTop: "-5px" }}>{userData?.email}</p>

        </Grid>
        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          style={{ marginTop: "20px" }}
        >
          {localStorage.getItem('isPropertyOwner') == 'true'  &&
            <Grid item xs={3}>
              <Link to="/mainscreen/room" style={{ textDecoration: "none" }}>
                <Paper elevation={1} style={{ padding: "10px", display: "flex" }} >
                  <img
                    src={booking}
                    alt="logo"
                    class="img-responsive"
                    style={{ width: 40, height: 40, padding: "5px" }}

                  />
                  <div style={{ paddingLeft: "10px" }}>
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>Dashboard</p>
                    <p style={{ fontSize: "10px", color: "#908e8e", marginTop: "-5px" }}>Rooms, Recent booking</p>
                  </div>
                </Paper>
              </Link>
            </Grid>
          }
          <Grid item xs={3}>
            <Link to="/account" style={{ textDecoration: "none" }}>
              <Paper elevation={1} style={{ padding: "10px", display: "flex" }} >
                <img
                  src={acount}
                  alt="logo"
                  class="img-responsive"
                  style={{ width: 40, height: 40, padding: "5px" }}

                />
                <div style={{ paddingLeft: "10px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>Account details</p>
                  <p style={{ fontSize: "10px", color: "#908e8e", marginTop: "-5px" }}>Personal info, login password & security</p>
                </div>
              </Paper>
            </Link>
          </Grid>
        </Grid>

        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={3}>
          <Link to="/bookingHistory" style={{ textDecoration: "none" }}>
            <Paper elevation={1} style={{ padding: "10px", display: "flex" }} >
              <img
                src={message}
                alt="logo"
                class="img-responsive"
                style={{ width: 40, height: 40, padding: "5px" }}

              />
              <div style={{ paddingLeft: "10px" }}>
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>Booking History</p>
                <p style={{ fontSize: "10px", color: "#908e8e", marginTop: "-5px" }}>View Booking List </p>
              </div>
            </Paper>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={1} style={{ padding: "10px", display: "flex" }} >
              <img
                src={help}
                alt="logo"
                class="img-responsive"
                style={{ width: 40, height: 40, padding: "5px" }}

              />
              <div style={{ paddingLeft: "10px" }}>
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>Help & FAQ</p>
                <p style={{ fontSize: "10px", color: "#908e8e", marginTop: "-5px" }}>24*7 support and queries</p>
              </div>
            </Paper>
          </Grid>
        </Grid>


      </div>
    </div>
  )
}

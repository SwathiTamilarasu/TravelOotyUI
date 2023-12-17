import React, { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid, IconButton, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CONFIG } from "../../Utils/config";
import Loader from '../../Utils/loader';
import Header from '../header';
import * as moment from 'moment';

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
    overflow: "scroll",
  },
});

export default function BookingHistory() {
  const classes = useStyles();
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const getBookingDetails = async () => {
    await axios.get(CONFIG.API_URL + `Bookings/UserId?userId=${localStorage.getItem('userId')}`)
      .then(res => {
        setIsLoading(false);
        res.data.forEach((data) => {
          data.noOfRoomBookings = data.roomBookings.reduce(function (sum, elem) {
            return sum + elem.numberOfRooms;
          }, 0);
        })
        setBookingDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }

  useEffect(() => {

    getBookingDetails();
  }, [])


  return (
    <div className={classes.root}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <div className={classes.gridspace}>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              color: "black",
            }}
          >
            <span style={{ fontWeight: "bold", paddingTop: "2px" }}>
              <ArrowBackIosIcon />
            </span>
            Booking History
          </p>
        </Link>
        <Grid container spacing={4} style={{ marginTop: "15px" }}>
          {typeof bookingDetails !== 'string' ? <TableContainer component={Paper} >
            <Table aria-label="simple table">

              <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
                <TableRow >
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>Booking ID</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>Reserved Date</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Reserved Rooms</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Guest Name</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Email/Phone</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Amount</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "auto" }}>
                {bookingDetails.map((row) => (
                  <TableRow
                    key={row.bookingId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {row.bookingId}
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {moment.utc(row.bookedDate).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.noOfRoomBookings}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.firstName}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.emailId}/{row.phoneNumber}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.totalAmount}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.payAtHotel ? 'Pay at Hotel' :'Online payment'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            : <div>{bookingDetails}</div>}
        </Grid>
      </div>
    </div>
  );
}

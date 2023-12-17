import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from '../../../Utils/loader';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import * as moment from 'moment';
const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold"
  }
});

export default function Bookings() {
  const classes = useStyles();
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getBookingDetails = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Bookings/UserId?userId=${localStorage.getItem('userId')}`)
      .then(res => {
        setIsLoading(false);
        setBookingDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })

  }
  useEffect(() => {
    getBookingDetails()
  }, [])
  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      {typeof bookingDetails !== 'string' ? <TableContainer component={Paper} >
        <Table aria-label="simple table">

          <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
            <TableRow >
            <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>Booking Ref No</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>Scheduled date</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Rooms</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Guest Name</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Email</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Phone</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Amount</TableCell>
              {/* <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: "auto" }}>
            {bookingDetails.map((row) => (
              <TableRow
                key={row.bookingId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              > <TableCell align="left" style={{ fontSize: "14px", fontWeight: "bold"  }}>TO{row.bookingId}</TableCell>
                <TableCell component="th" scope="row" style={{ fontSize: "14px",}}>
                  {moment.utc(row.checkIn).format('DD MMM YYYY')} -  {moment.utc(row.checkOut).format('DD MMM YYYY')}
                </TableCell>
                <TableCell align="center" style={{ fontSize: "14px" }}> {row.roomBookings[0].numberOfRooms}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.firstName}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.emailId}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.phoneNumber}</TableCell>
                <TableCell align="right" style={{ fontSize: "14px" }}>{row.totalAmount}</TableCell>
                {/* <TableCell align="left" style={{ fontSize: "14px" }}>{row.paymentStatus}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <div>{bookingDetails}</div>}

    </div>
  )
}

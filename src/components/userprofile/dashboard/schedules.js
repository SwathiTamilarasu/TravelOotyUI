import React, { useEffect } from "react";
import { Grid, Typography, TextField, Modal, Button, Box, Select, MenuItem, FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import Loader from '../../../Utils/loader';
import * as moment from 'moment';



const useStyles = makeStyles({
  rooms: {
    border: "1px solid grey",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "10px",
    width: "fit-content"
  },
  roomsname: {
    margin: "0px"
  },
  roomsReserved: {
    height: "fit-content",
    border: "1px solid grey",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "10px",
    width: "fit-content",
    backgroundColor: "rgb(13, 74, 67)",
    cursor: "pointer"
  },
  roomsnameReserved: {
    color: "white",
    margin: "0px"
  },
  totalrooms: {
    border: "1px solid grey",
    borderRadius: "5px",
    marginTop: "15px",
    width: "100%",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  booked: {
    height: "20px",
    width: "20px",
    border: "1px solid rgb(13, 74, 67)",
    backgroundColor: "rgb(13, 74, 67)",
    borderRadius: "3px"
  },
  available: {
    height: "20px",
    width: "20px",
    border: "1px solid rgb(13, 74, 67)",
    backgroundColor: "white",
    borderRadius: "3px"
  },
  inputtypes: {
    width: "99%", height: "40px", border: "1px solid lightgrey", borderRadius: "8px"
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "600px",
  overflow: "scroll",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Schedules() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [roomDetails, setRoomDetails] = React.useState([]);
  const [bookingDetails, setBookingDetails] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkInDate, setCheckInDate] = React.useState([]);
  const [checkOutDate, setCheckOutDate] = React.useState([]);
  const [bookingerrors, setbookingerrors] = React.useState({});
  const [roomId, setRoomId] = React.useState()
  const handleOpen = (roomDetail) => {
    setRoomId(roomDetail.roomId)
    setOpen(true)
  };
  const handleClose = () => {
    setCheckInDate([]);
    setCheckOutDate([]);
    setRoomId();
    setBookingDetails([]);
    setOpen(false)
  };
  const dateChange = (value, type) => {
    if (type === 'fromDate') {
      setCheckInDate(value);
      if (checkOutDate !== undefined && checkOutDate !== null && checkOutDate.length !== 0) {
        getBookings(value, checkOutDate)
      }
    }
    if (type === 'toDate') {
      setCheckOutDate(value);
      if (checkInDate !== undefined && checkInDate !== null && checkInDate.length !== 0) {
        getBookings(checkInDate, value)
      }
    }
  }

  const handleRoomCatChange = (event, room, roomIndex) => {

    const dupPropDet = [...bookingDetails];
    dupPropDet[roomIndex].noOfRoomsSelected = event.target.value;
    setBookingDetails(dupPropDet);
  };
  const getRooms = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Rooms/UserId?userId=${localStorage.getItem('userId')}`)
      .then(res => {
        setIsLoading(false)
        setRoomDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })

  }
  const getBookings = async (checkInDate, checkOutDate) => {
    setBookingDetails([]);
    setIsLoading(true);
    const checkIn = moment(checkInDate).format('YYYY-MM-DD');
    const checkOut = moment(checkOutDate).format('YYYY-MM-DD');
    await axios.get(CONFIG.API_URL + `Bookings/GetRoomByBookingDate/${roomId}/${checkIn}/${checkOut}`)
      .then(res => {
        setIsLoading(false)
        setBookingDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })

  }
  const onSwitchChange = (e, rowData) => {
    const saveData={...rowData}
    e.preventDefault();

    setIsLoading(true);
    const options = {
      mode: 'no-cors',
      method: 'POST',
      url: 'https://api.cashfree.com/pg/orders',
      headers: {
        Accept: 'application/json',
        'x-client-id': '2329003bf61b5c1217455bcb5b009232',
        'x-client-secret': '4b59eb73c612326807af4592969470a8c9089760',
        'x-api-version': '2022-01-01',
        'Content-Type': 'application/json'
      },
      data: {
        customer_details: {
          customer_id: '1212',
          customer_email: 'prasathraj94@gmail.com',
          customer_phone: '9944441101'
        },
        order_meta: {
          return_url: 'http://example.com?order_id={order_id}&order_token={order_token}',
          notify_url: 'https://example.com'
        },
        order_id: '1121212121212',
        order_amount: 1,
        order_currency: 'INR'
      }
    };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     window.open(response.data.payment_link, '_blank', 'noopener,noreferrer');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    saveData.isBlocked = e.target.checked;
    saveData.roomBookings = [{
      "bookingId": saveData.bookingId,
      "roomId": saveData.roomId,
      "numberOfRooms": saveData.noOfRoomsSelected
    }]
    saveData.totalAmount = 0;
    if (saveData.bookingId === 0) {
      axios.post(CONFIG.API_URL + 'Bookings', saveData).then(res => {
        setIsLoading(false)
        if (res.status === 200) {
          getBookings(checkInDate, checkOutDate);
          alert('Updated successfully');
          // navigate('/mainscreen/room');

        }
      })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
          // setError(err.response.data.error)
        });
    } else {
      axios.put(CONFIG.API_URL + 'Bookings', saveData).then(res => {
        setIsLoading(false)
        if (res.status === 200) {
          getBookings(checkInDate, checkOutDate);
          alert('Updated successfully');
          // navigate('/mainscreen/room');

        }
      })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
          // setError(err.response.data.error)
        });
    }

  }
  useEffect(() => {
    getRooms()
  }, [])
  //   handleSelect=(ranges)=>{
  //     console.log(ranges);
  //     {
  //       selection: {
  //         startDate: [native Date Object],
  //         endDate: [native Date Object],
  //       }
  //     }
  //   }
  //   const selectionRange = {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: 'selection',
  //   }
  return (
    <div>
       {isLoading && <Loader isLoading={isLoading} />}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid xs={6}>
          <p
            style={{
              fontSize: "18px",
              color: "rgb(13, 74, 67)",
              fontWeight: "bold",
            }}
          >
            Schedules
          </p>
        </Grid>
        <Grid xs={6}>
          {/* <Grid container alignItems="center" justifyContent="space-between">
            <Grid style={{display:"flex"}}>
                <div className={classes.booked}></div>
                <p style={{paddingLeft:"10px"}}>Booked</p>
            </Grid>
            <Grid style={{display:"flex"}}>
                <div className={classes.available}></div>
                <p style={{paddingLeft:"10px"}}>Available </p>
            </Grid>
            <Grid>
         
          </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid style={{ height: "700px" }}>
        {typeof roomDetails !== 'string' ? <div className={classes.totalrooms}>
          {roomDetails.length !== 0 && roomDetails.map((row) => (
            <div key={row.roomId} className={classes.roomsReserved} onClick={() => handleOpen(row)}>
              <p className={classes.roomsnameReserved}>{row.roomCategoryName}</p>
            </div>
          ))}

        </div> : <div>{roomDetails}</div>}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container alignItems="center" justifyContent="space-between" style={{ paddingBottom: "15px" }}>
            <Grid>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>Booking Details</p>
            </Grid>
            <Grid>
              {/* <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      /> */}
              <LocalizationProvider
                style={{ fontSize: "18px" }}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  style={{ fontSize: "18px" }}
                  label="From Date"
                  value={checkInDate}
                  onChange={(newValue) => {
                    dateChange(newValue, 'fromDate')
                  }}
                  renderInput={(params) => (
                    <TextField style={{ fontSize: "18px" }} {...params} />
                  )}
                />
              </LocalizationProvider>
              &nbsp;&nbsp;&nbsp;
              <LocalizationProvider
                style={{ fontSize: "18px" }}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  style={{ fontSize: "18px" }}
                  label="To Date"
                  value={checkOutDate}
                  onChange={(newValue) => {
                    dateChange(newValue, 'toDate')
                  }}
                  renderInput={(params) => (
                    <TextField style={{ fontSize: "18px" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <TableContainer component={Paper} >
            <Table aria-label="simple table">

              <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
                <TableRow >
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>S.No</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Date</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Booked by</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Booking ID</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Email ID</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Phone No</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Price</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Select rooms</TableCell>
                  <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="right"> Unblock / Block</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "auto" }}>
                {bookingDetails.length !== 0 && bookingDetails.map((row, rowIndex) => (
                  <TableRow key={rowIndex}

                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {rowIndex + 1}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{moment(row.bookedDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{String(row.paymentStatus) === 'true' ? row.firstName : String(row.isBlocked) === 'false' ? 'Not Booking' : 'Owner'}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{row.bookingId}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px" }}>{String(row.paymentStatus) === 'true' ? row.emailId : String(row.isBlocked) === 'false' ? 'Not Booking' : 'Owner'}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px", }}>{String(row.paymentStatus) === 'true' ? row.phoneNumber : String(row.isBlocked) === 'false' ? 'Not Booking' : 'Owner'}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px", }}>{row.totalAmount}</TableCell>
                    <TableCell align="left" style={{ fontSize: "14px", }}>
                    {String(row.paymentStatus) === 'true'|| String(row.isBlocked) === 'true' ? row.noOfRoomsSelected :  <select name="noOfRoomsSelected" id="sel1" value={row.noOfRoomsSelected ?? ""} disabled={row.isBlocked === true}
                        onChange={(e) => handleRoomCatChange(e, row, rowIndex)} className={bookingerrors.noOfRoomsSelected ? `showError form-control` : 'form-control'} >
                        <option value="0">Select</option>
                        {row.roomsLeft ? [...Array(parseInt(row.roomsLeft))].map((e, i) => {
                          return (
                            <option value={i + 1}>
                              {i + 1}
                            </option>
                          );
                        }) : <option value="1">1
                        </option>}
                      </select>}
                     


                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "14px", }}>
                      {String(row.paymentStatus) === 'false' ? <FormGroup style={{ alignItems: "flex-end" }}>
                        <FormControlLabel control={<Switch disabled={row.noOfRoomsSelected == 0} checked={row.isBlocked} onChange={(e) => onSwitchChange(e, row)} />} />
                      </FormGroup> : ""}
                    </TableCell>
                  </TableRow>
                ))}



              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}

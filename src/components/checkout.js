import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";
import Header from './header';
import {
  Grid,
  Typography,
  TextField,
  Popover,
  Container,
  Card,
  Box,
  Modal,
  Divider,
  Button
} from "@mui/material";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import * as moment from 'moment';
import { CONFIG } from "../Utils/config";
import Loader from '../Utils/loader';
const useStyles = makeStyles({
  root: {
    marginTop: 100,
  },
  right:{
width:"100%",
marginRight:"20px",
"@media (max-width: 500px)": {
  marginRight:"20px",
},
  },
  modalbox: {
    "@media (max-width: 700px)": {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "100%",
      backgroundColor: 'white',
      padding: 4,
      borderRadius:"8px",
      textAlign:"center"
      
    },
    "@media (min-width: 700px)": {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      backgroundColor: 'white',
      padding: 4,
      borderRadius:"8px",
      textAlign:"center"
    },
  },
  inputBox: {
    borderRadius: "8px!important",
    padding: "10px 5px"
  }

});

export default function Checkout() {
  const classes = useStyles();
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailId: '',
    confirmEmailId: '',
    arrivalTime: '',
    specialRequest: ''
  });
  const [bookingError, setBookingError] = useState({});
  const [regexError, setRegexError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [reservedDatas] = useState(JSON.parse(localStorage.getItem("bookingDetails") ?? "null"));
  const [checkIn] = useState(moment(reservedDatas.checkIn).format('DD MMM YYYY'));
  const [checkOut] = useState(moment(reservedDatas.checkOut).format('DD MMM YYYY'));
  const [checkInTime] = useState(moment.utc(reservedDatas.checkIn).local().format("LT"));
  const [checkOutTime] = useState(moment.utc(reservedDatas.checkOut).local().format("LT"));
  const [open, setOpen] = React.useState(false);
  const [successMessage,setSuccessMessage]=React.useState(false);
  const handleModalOpen = (room) => {   
    setOpen(true)
  };
  const handleModalClose = () => {
    setOpen(false)
  
  };
  const onChangeBookingDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails, [name]: value
    })
    let errors = {};
    if (value === "" && name !== "arrivalTime" && name !== "specialRequest") {

      errors[name] = true;
      setBookingError({ ...bookingError, [name]: true })
    } else if (name === 'emailId' || name === 'confirmEmailId') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        errors[name] = true;
        setRegexError({ ...regexError, [name]: true })
      } else {
        errors[name] = false;
        setRegexError({ ...regexError, [name]: false })
      }
    } else if (name === 'phoneNumber') {
      const mobileRegex = /[0-9]{10}/;
      if (!mobileRegex.test(value)) {
        errors[name] = true;
        setRegexError({ ...regexError, [name]: true })
      } else {
        errors[name] = false;
        setRegexError({ ...regexError, [name]: false })
      }
    } else {
      errors[name] = false;
      setBookingError({ ...bookingError, [name]: false })
    }
  };
  const onSubmit = (type) => {
    if (validate(bookingDetails)) {
      if (bookingDetails.emailId !== bookingDetails.confirmEmailId) {
        alert("Email and Confirm Email is mismatched")
      } else {
        let saveDetails = { ...bookingDetails };
        saveDetails.checkIn = reservedDatas.checkIn;
        saveDetails.checkOut = reservedDatas.checkOut;
        saveDetails.paymentStatus = true;
        saveDetails.roomBookings = reservedDatas.roomBookings;
        saveDetails.totalAmount = reservedDatas.total;
        saveDetails.orderCurrency = "INR";
        saveDetails.createdBy=localStorage.getItem('userId');
        if (type === 'atHotel') {
          saveDetails.payAtHotel = true;
        } else {
          saveDetails.payAtHotel = false;
        }
        setIsLoading(true)
        axios.post(CONFIG.API_URL + 'Bookings', saveDetails).then(res => {
          setIsLoading(false)
          if (res.status === 200) {
            console.log(res.data);
            if (type === 'pay') {
              window.open(res.data.payment_link, '_self', 'noopener,noreferrer');
            } else {
              setOpen(true)
              setSuccessMessage('Booking Successfull')
             // alert('Updated successfully');
            }
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
  }
  const validate = () => {
    let errors = {};
    if (!bookingDetails.firstName) {
      errors.firstName = true;
    }
    if (!bookingDetails.lastName) {
      errors.lastName = true;
    }
    if (!bookingDetails.phoneNumber) {
      errors.phoneNumber = true;
    }
    if (!bookingDetails.emailId) {
      errors.emailId = true;
    }
    if (!bookingDetails.confirmEmailId) {
      errors.confirmEmailId = true;
    }
    if (regexError.emailId) {
      errors.emailId = true;
    }
    if (regexError.confirmEmailId) {
      errors.confirmEmailId = true;
    }
    if (regexError.phoneNumber) {
      errors.phoneNumber = true;
    }
    setBookingError(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={classes.root}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <Container>
        <Grid>
          <Stack direction="row" spacing={3} style={{ flexWrap: "wrap" }}>
            <Button
              size="small"
              style={{
                color: "black",
                border: "1px solid #b7b7b7",
                borderRadius: 99,
                // padding: 15,
                height: "35px",
                marginBottom: "15px",
                marginTop: "-15px"
              }}
              onClick={() => window.history.go(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ fontSize: "16px" }} />
            </Button>
          </Stack>
        </Grid>
        <Grid container alignItems="center" direction="row" spacing={3}>
          <Grid item sm={6} xs={12}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(13, 74, 67)" }}>Your Booking Details</p>
              <div style={{ display: "flex", border: "1px solid rgb(13, 74, 67)", borderRadius: "8px" }}>
                <div style={{ padding: "10px 30px" }}>
                  <p>Check In</p>
                  <p style={{ fontWeight: "bold" }}>{checkIn}</p>
                  <p style={{ color: "grey" }}>From {checkInTime}</p>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                <div style={{ padding: "10px 30px" }}>
                  <p>Check Out</p>
                  <p style={{ fontWeight: "bold" }}>{checkOut}</p>
                  <p style={{ color: "grey" }}>Until {checkOutTime}</p>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                <div style={{ padding: "10px 30px" }}>
                  <p>Total Amount</p>
                  <p style={{ fontWeight: "bold" }}>₹ {reservedDatas.total}</p>
                  <p style={{ color: "grey" }}>gst included</p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(13, 74, 67)" }}>Your Hotel Details</p>
              <div style={{ display: "flex", border: "1px solid rgb(13, 74, 67)", borderRadius: "8px" }}>
                <div style={{ padding: "10px 30px" }}>
                  <p style={{ fontWeight: "bold" }}>{reservedDatas.propDetails.name}</p>
                  <p style={{ color: "grey" }}>{reservedDatas.propDetails.address}</p>
                  {console.log(reservedDatas.reservedRooms)}
                  {reservedDatas.reservedRooms && reservedDatas.reservedRooms.map((roomDetails) => (
                 
                    <p style={{ color: "rgb(13, 74, 67)" }} key={roomDetails.roomId}>{roomDetails.noofroom}&nbsp;&nbsp;{roomDetails.roomCategoryName} , {roomDetails.guests*roomDetails.noofroom} guests&nbsp;&nbsp;<span style={{color:"grey",fontSize:"12px"}}>({roomDetails.cancellationPolicy})</span></p>
                  
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />
        <Grid>
          <div>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(13, 74, 67)" }}>Enter your details</p>

            <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
              <Grid item sm={4} xs={12}>
                <div className={classes.right}>
                  <label htmlFor="firstname" style={{ fontSize: 12, color: "grey" }}>
                    First Name<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;*</span>
                  </label><br />
                  <input type="text" name="firstName" className={bookingError.firstName ? `showError inputBox` : 'inputBox'} value={bookingDetails.firstName ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.left}>
                  <label htmlFor="lastname" style={{ fontSize: 12, color: "grey" }}>
                    Last Name<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;*</span>
                  </label><br />
                  <input type="text" name="lastName" className={bookingError.lastName ? `showError inputBox` : 'inputBox'} value={bookingDetails.lastName ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.left}>
                  <label htmlFor="phonenumber" style={{ fontSize: 12, color: "grey" }}>
                    Phone Number<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;*</span>
                  </label><br />
                  <input type="number" name="phoneNumber" className={bookingError.phoneNumber ? `showError inputBox` : 'inputBox'} value={bookingDetails.phoneNumber ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
              <Grid item sm={4} xs={12}>
                <div className={classes.right}>
                  <label htmlFor="email" style={{ fontSize: 12, color: "grey" }}>
                    Email id<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;*</span>
                  </label><br />
                  <input type="text" name="emailId" className={bookingError.emailId ? `showError inputBox` : 'inputBox'} value={bookingDetails.emailId ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.left}>
                  <label htmlFor="confirmemail" style={{ fontSize: 12, color: "grey" }}>
                    Confirm Email id<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;*</span>
                  </label><br />
                  <input type="text" name="confirmEmailId" className={bookingError.confirmEmailId ? `showError inputBox` : 'inputBox'} value={bookingDetails.confirmEmailId ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.left}>
                  <label htmlFor="arrivaltime" style={{ fontSize: 12, color: "grey" }}>
                    Estimated arrival time<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;</span>
                  </label><br />
                  <input type="text" name="arrivalTime" className="inputBox" value={bookingDetails.arrivalTime ?? ""} onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", height: "40px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" alignItems="flex-start" justifyContent="space-between" spacing={3}>
              <Grid item sm={6} xs={12}>
                <div className={classes.right}>
                  <label htmlFor="special" style={{ fontSize: 12, color: "grey" }}>
                    Special Request<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;</span>
                  </label><br />
                  <textarea rows="6" type="text" name="specialRequest" value={bookingDetails.specialRequest ?? ""} className="inputBox" onChange={(e) => onChangeBookingDetails(e)}
                    style={{ borderRadius: "5px", border: "1px solid grey", width: "100%" }} />
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                {/* <div style={{ width: "100%", marginRight: "20px", marginTop: "20px" }}>
                  <label htmlFor="cancel" style={{ fontSize: 12, color: "grey" }}>
                    Cancellation Policy<span style={{ color: '#fa6348', fontSize: 12 }}>&nbsp;</span>
                  </label><br />
                  <p style={{ color: "black" }}>Free Cancellation Policy</p>
                </div> */}
              </Grid>
            </Grid>

          </div>
        </Grid>
        <Grid container alignItems="flex-end" justifyContent="flex-end" style={{ marginBottom: "40px" }}>
          <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginRight: "10px" }} size="large" variant="contained" onClick={() => onSubmit('pay')}>Pay Now</Button>
          <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px" }} size="large" variant="contained" onClick={() => onSubmit('atHotel')}>Pay at Hotel</Button>
          <Modal
                      open={open}
                      // onClose={handleModalClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className={classes.modalbox}>
                        <p style={{fontSize:"22px",color:"#0d4a43",padding:"40px"}}>{successMessage}</p>
                        <p style={{fontSize:"16px",color:"gray",padding:"10px"}}>Please check the email send to you for booking details.</p>
                        <Link to="/hotels" onClose={handleModalClose}>
                        <Button style={{padding:"10px 60px",color:"white",backgroundColor:"#0d4a43",borderRadius:"5px",fontSize:"14px",textTransform:"capitalize",marginBottom:"40px"}}>Book More</Button>
                        </Link>
                      </Box>
                    </Modal>
        </Grid>

      </Container>
    </div>
  )
}

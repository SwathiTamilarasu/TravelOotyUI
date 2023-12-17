import React, { useEffect,useRef } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  TextField,
  Popover,
  Container,
  Card,
  Modal
} from "@mui/material";
import Stack from "@mui/material/Stack";
import addWeeks from "date-fns/addWeeks";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Header from "./header";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-gallery-carousel";
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import "react-gallery-carousel/dist/index.css";
import {
  faArrowLeft,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../Utils/config";
import Loader from '../Utils/loader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as moment from 'moment';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';
import Mapimage from "../images/Mapimage.svg";






const useStyles = makeStyles({
  root: {
    marginTop: 50,
  },
  gridsapce: {
    "@media (max-width: 1100px)": {
      paddingTop: 30,
      //    marginLeft: 100,
      // marginRight: 100,
    },
    "@media (min-width: 1100px)": {
      paddingTop: 30,
      //   marginLeft: 180,
      // marginRight: 180,
    },
  },
  glary: {
    "@media (max-width: 700px)": {
      height: "30vh",
    },
    "@media (min-width: 700px)": {
      height: "70vh",
    },
  },
  cardPrice: {
    margin: "15px 0px",
    padding: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
    borderRadius: 12
    // display:"flex"
  },
  rooomcat: {
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgb(13, 74, 67)",
  },
  bed: {
    fontWeight: "bold",
    alignItems: "center"
  },
  service: {
    // backgroundColor: "rgb(246, 247, 249)",
    // border: "1px solid lightgrey",
    padding: "0px 8px",
    // borderRadius: "8px",
    fontSize: "12px",
    // margin: "3px",
    // height: "27px",
  },
  servicegrid: {
    maxHeight: "150px",
    overflowY: 'auto',
    display: "flex",
    flexWrap: "wrap",
  },
  picker: {
    "@media (max-width: 500px)": {
        width: "100%"
    },
   '& .DateInput_input':{
       fontSize:"14px"
   },
   '& .DateInput':{
     width:"107px"
   }
},
dates: {
    display: "flex",
    "@media (max-width: 500px)": {
        display: "block",
    },
},
picker: {
    "@media (max-width: 500px)": {
        width: "100%",
        marginBottom: "10px"
    },
    '& .DateInput_input':{
        fontSize:"14px"
    },
    '& .DateInput':{
      width:"107px"
    }
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
    },
    "@media (min-width: 700px)": {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      backgroundColor: 'white',
      padding: 4,
    },
  },
});



function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}
export const HORIZONTAL_ORIENTATION = "horizontal";
export const VERTICAL_ORIENTATION = "vertical";


export default function Hotelinfo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const localAdults = localStorage.getItem('selectedAdults') === null ? 2 : localStorage.getItem('selectedAdults');
  const localChilds = localStorage.getItem('selectedChilds') === null ? 0 : localStorage.getItem('selectedChilds');
  const localRooms = localStorage.getItem('selectedRooms') === null ? 1 : localStorage.getItem('selectedRooms');
  const localCheckIn = localStorage.getItem('checkinDate') === null ? moment() : moment(localStorage.getItem('checkinDate'));
  const [checkInDate, setCheckInDate] = React.useState(localCheckIn);
  const localCheckOut = localStorage.getItem('checkoutDate') === null ? moment().add(1, 'days') : moment(localStorage.getItem('checkoutDate'));
  const [checkOutDate, setCheckOutDate] = React.useState(localCheckOut);
  const localDateDiff = localCheckOut.diff(localCheckIn, 'days') 
 
  const [dateDiff, setDateDiff] = React.useState(localDateDiff);
  let { id } = useParams();
  const [noofroom, setNoofRoom] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adults, setAdults] = React.useState(localAdults);
  const [children, setChildren] = React.useState(localChilds);
  const [rooms, setRooms] = React.useState(localRooms);
  const [roomDetails, setRoomDetails] = React.useState([]);
  const [propDetails, setPropDetails] = React.useState([]);
  const [reservedRoomDetails, setReservedRoomDetails] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [propImage, setPropImage] = React.useState({})
  const [roomImages, setRoomImages] = React.useState([]);
  const [totalPaid, setTotalPaid] = React.useState(0);
  const [gstAmount, setGstAmount] = React.useState(0);
  const [isCheckInFirst, setIsCheckInFirst] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState(null);
  const [promocode, setPromocode] = React.useState('');
  const [discountValue, setDiscountValue] = React.useState(0);
  const [totalPaidbeforeDiscount, setTotalPaidbeforeDiscount] = React.useState(0);
  const [enableDiscountBtn,  setenableDiscountBtn] = React.useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    getProperty();
  }, [])
  const getRooms = async (checkIn, checkOut, imageData) => {
    setIsLoading(true)
    setImages([imageData]);
    const checkinDateValue = moment(checkIn).format('MM-DD-YYYY');
    const checkOutDateValue = moment(checkOut).format('MM-DD-YYYY');
    await axios.get(CONFIG.API_URL + `Rooms/GetRoomByPropertyDate/${id}/${checkinDateValue}/${checkOutDateValue}`)
      .then(res => {
        setIsLoading(false)
        if (res.data.length != 0) {
          res.data.map((roomDetail, roomIndex) => {
            roomDetail.price = roomDetail.regularPrice;
            roomDetail.noofroom = 1;
            roomDetail.isReserved = false;
            if (roomDetail.roomsImageDetails.length != 0) {
              roomDetail.roomsImageDetails.map((roomImage) => {
                setImages(current => [...current, { original: roomImage.imagePath, thumbnail: roomImage.imagePath }])
              })
            }
          })
        }
        setRoomDetails(res.data);
        setReservedRoomDetails([]);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  const getProperty = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Property/GetPropertyById/${id}`)
      .then(res => {
        setIsLoading(false);
        setPropImage({ original: res.data.imagePath, thumbnail: res.data.imagePath });
        getRooms(checkInDate, checkOutDate, { original: res.data.imagePath, thumbnail: res.data.imagePath })
        setPropDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })

  }
  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleRoomCatChange = (event, room, roomIndex) => {
    if (event.target.value != null && event.target.value != undefined && event.target.value != 0) {
      const dupPropDet = [...roomDetails];
      dupPropDet[roomIndex].price = parseInt(event.target.value) * parseInt(room.regularPrice);
      dupPropDet[roomIndex].noofroom = event.target.value;
      let reservedRooms = [...reservedRoomDetails];
      let total
      if (room.isReserved === true) {
        reservedRooms.map((resRoom, resIndex) => {
          if (resRoom.roomId === room.roomId) {
            reservedRooms[resIndex].noofroom = event.target.value;
            if (dateDiff !== 0) {
              reservedRooms[resIndex].price =
                parseInt(event.target.value) * parseInt(room.regularPrice);
            }
          }
        });

        //Price change start
        let changeroomdetails = [...reservedRooms];
        let changeroomdetails_new = [];
        for (let rom of changeroomdetails) {
          let updatedRoom = { ...rom };
          if (
            updatedRoom.specialPrice &&
            updatedRoom.specialPrice >= 0 &&
            updatedRoom.specialPrice <= 100 &&
            updatedRoom.roomId === room.roomId
          ) {
            updatedRoom.price = specialPriceCalculation(
              rom.price,
              rom.specialPrice
            );
          }
          changeroomdetails_new.push(updatedRoom);
        }
        reservedRooms = [...changeroomdetails_new];
        //Price change end

        total = reservedRooms
          .map((item) => item.price)
          .reduce((prev, curr) => prev + curr, 0);
        if (dateDiff != 0) {
          total = total * dateDiff;
        } else {
          total = total;
        }
        let gst = 0;
        if (propDetails.tax !== 0) {
          gst = (total / 100) * propDetails.tax;
          total = total + gst;
        }
        setGstAmount(gst);
        setReservedRoomDetails(reservedRooms);
        setTotalPaid(total);
        setTotalPaidbeforeDiscount(total);

        if (promocode) {
          let discountValuepercentage = +discountValue / 100;
          let totalValue = total - total * discountValuepercentage;
          setTotalPaid(totalValue);
        }
      }
      setRoomDetails(dupPropDet);
    }
  };
  const onDateChange = (startDate, endDate) => {
    let dateDiffValue = 0;
    let checkInValue = checkInDate;
    let checkOutValue = checkOutDate;
    let isValid = false;   
    if (startDate != null) {
      setCheckInDate(startDate);
      checkInValue = startDate;
    }
    if (endDate != null) {
      setCheckOutDate(endDate);
      checkOutValue = endDate;
    }
    if (startDate !== null && endDate !== null) {
      isValid = false
      let date1 = moment(startDate);
      let date2 = moment(endDate);
      dateDiffValue = date2.diff(date1, 'days')
      setDateDiff(dateDiffValue);
    }else{
      isValid = true
    }
    if (isValid === false) {
      getRooms(checkInValue, checkOutValue, propImage);
    } else {
      isValid = false;
    }

  }
  const handleAddToReserve = (room, roomIndex) => {
    if(discountValue > 0){
      ResetDiscountValue()
    }
    const dupPropDet = [...roomDetails];
    let reservedRooms = [...reservedRoomDetails];
    let total;
    dupPropDet[roomIndex].isReserved = !room.isReserved;
    if (room.isReserved === true) {
      reservedRooms.push(room)
    } else {
      reservedRooms = reservedRooms.filter(resRoom => {
        return resRoom.roomId !== room.roomId
      })
    }
    //Price change start
    let changeroomdetails = [...reservedRooms]
    let changeroomdetails_new = []
    for (let rom of changeroomdetails) {
      let updatedRoom = { ...rom };
      if(updatedRoom.specialPrice && updatedRoom.specialPrice >=0 && updatedRoom.specialPrice <= 100
        && !updatedRoom.priceUpdate){
        updatedRoom.priceUpdate = true
        updatedRoom.price = specialPriceCalculation(rom.price,rom.specialPrice)
      }
      changeroomdetails_new.push(updatedRoom)
    }
     reservedRooms = [...changeroomdetails_new]
    //Price change end

   

    total = reservedRooms.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    if (dateDiff != 0) {
      total = total * dateDiff;
    } else {
      total = total;
    }
    let gst = 0
    if (propDetails.tax !== 0) {
      gst = (total / 100) * propDetails.tax;
      total = total + gst;
    }
    setGstAmount(gst);
    setReservedRoomDetails(reservedRooms)
    setRoomDetails(dupPropDet);
    setTotalPaid(total);
    setTotalPaidbeforeDiscount(total)

  }
  const handleModalOpen = (room) => {
    room.roomsImageDetails && room.roomsImageDetails.map((image) => {
      setRoomImages(current => [...current, { original: image.imagePath, thumbnail: image.imagePath }])
    }
    )
    setOpen(true)
  };
  const handleModalClose = () => {
    setOpen(false)
    setRoomImages([])
  };
  const handleSubmit = () => {
    let sendData = {};
    if (checkInDate !== null && checkInDate !== undefined && checkOutDate !== null && checkOutDate !== undefined) {
      sendData.checkIn = moment(checkInDate, moment.ISO_8601);
      sendData.checkOut = moment(checkOutDate, moment.ISO_8601);
      sendData.paymentStatus = true;
      sendData.total = totalPaid;
      sendData.reservedRooms = reservedRoomDetails;
      sendData.propDetails = propDetails;
      sendData.roomBookings = [];
      if (reservedRoomDetails.length !== 0) {
        reservedRoomDetails.map((roomDet) => {
          sendData.roomBookings.push({
            "bookingId": 0,
            "roomId": roomDet.roomId,
            "numberOfRooms": roomDet.noofroom
          })
        })
      }
      localStorage.setItem('bookingDetails', JSON.stringify(sendData));
      navigate('/checkout');
    }
  };

  const onTextChangeProperty = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPromocode(value)
   }

  const ResetDiscountValue = async () => {
    setDiscountValue(0)
    setTotalPaid(totalPaidbeforeDiscount)
    setPromocode('')
    setenableDiscountBtn(true)
  }

  const BypromocodeGetDiscount = async () => {
    if(promocode){
      await axios.get(CONFIG.API_URL + `PromoCodes/${encodeURIComponent(promocode)}`)
      .then(res => {
        setIsLoading(false);
        if(typeof res.data === 'string'){
          alert( 'Promo Code is NOT VALID or Date expired')
          ResetDiscountValue()
        }
        else{
          if(discountValue > 0){
            ResetDiscountValue()
          }
          setenableDiscountBtn(false)
          setDiscountValue(res.data)
          setTotalPaidbeforeDiscount(totalPaid)
          let discountValuepercentage = (+res.data / 100)
          let totalValue = totalPaid - (totalPaid * discountValuepercentage )
          setTotalPaid(totalValue)
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
    }
  }
  const DropDownElement = ({ title, value, setValue }) => {
    return (
      <div
        style={{
          padding: 20,
          display: "block",
        }}
      >
        <span style={{ fontSize: 13, marginRight: 20 }}>{title}</span>
        <div style={{ position: "relative", float: "right" }}>
          <Button
            variant="outlined"
            style={{
              color: "#009182",
              borderColor: "#009182",
              marginRight: 10,
              fontSize: 14,
            }}
            onClick={() => {
              const newValue = value - 1;
              if (title === "Children" && newValue >= 0) {
                setValue(newValue);
              } else if (newValue >= 1) setValue(newValue);
            }}
          >
            -
          </Button>
          <Typography style={{ display: "inline", fontSize: 13 }}>
            {value}
          </Typography>
          <Button
            variant="outlined"
            style={{
              color: "#009182",
              borderColor: "#009182",
              marginLeft: 10,
              fontSize: 14,
            }}
            onClick={() => {
              const newValue = value + 1;
              setValue(newValue);
            }}
          >
            +
          </Button>
        </div>
      </div>
    );
  };

  const showInMapClicked = (lat, lng) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&dir_action=navigate`);
    // window.open("https://maps.google.com?q="+lat+","+lng );
  };

  // const specialPriceCalculation = (originalAmount, discountpercentt) => {
  //   const discountAmount = (discountpercentt / 100) * originalAmount;
  //   return originalAmount - discountAmount;
  // };
  const specialPriceCalculation = (originalAmount, discountpercentt) => {
    const discountAmount = (discountpercentt / 100) * originalAmount;
    return Math.round(originalAmount - discountAmount);
  };

  return (
    <div className={classes.root}>
      <Header />
      <Container fixed>
        <Grid className={classes.gridsapce}>
          {/* <Stack direction="row" spacing={3} style={{ flexWrap: "wrap" }}>
            <Button
              size="small"
              style={{
                color: "black",
                border: "1px solid #b7b7b7",
                borderRadius: 99,
                // padding: 15,
                height: "35px"
              }}
              onClick={() => window.history.go(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ fontSize: "16px" }} />
            </Button>
          </Stack> */}
        </Grid>
        <Grid
          container
          // direction="row"
          // spacing={4}
          sm={12}
        >
          <Grid sm={9} xs={12} className={classes.gridsapce}>
            <div style={{ marginBottom: "20px", marginRight: "20px" }} className={classes.glary}>
              <Carousel images={images} style={{ height: "100%", borderRadius: 12 }} />
            </div>
            <Grid container>
              <Grid style={{border:"1px solid black",padding:"0px 0px 0px 10px",marginRight:"10px",display:"flex",borderRadius:"5px"}}>
                 {propDetails.lat && propDetails.lng ?  <span  
                  style={{ cursor : "pointer", color : "#0d4a43" ,display:"flex",alignItems:"center",fontWeight:"bold"}} 
                  onClick={() => showInMapClicked(+propDetails.lat, +propDetails.lng)} >
                      Show on Map
                      <img
            src={Mapimage}
            alt="blog"
            class="img-responsive"
            style={{width:"60px",marginLeft:"10px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px"}}
          />
                     
                  </span> : <h1></h1>}
                </Grid>
              <Grid>
                <Typography style={{ fontSize: "22px", fontWeight: "bold" }}>
                  {propDetails.name}
                </Typography>
                <p style={{ fontSize: "14px", paddingTop: "15px" }}>
                  <span><LocationOnSharpIcon style={{ fontSize: "18px", color: "#1a76d2", marginBottom: "-3px" }} /></span>  {propDetails.address}
                  
                  {/* <span  style={{ cursor : "pointer", color : "blue", paddingLeft: "5px" }} 
                  onClick={() => showInMapClicked(latitude, longitude)} > - Show on Map</span> */}
                </p>
              </Grid>
              <Grid>
                {/* <Rating name="read-only" value={2} size="large" readOnly /> */}
              </Grid>
            </Grid>
            <Grid>
              <Grid
                container
                style={{
                  padding: "15px",
                  backgroundColor: "#f6f7f9",
                  marginTop: "20px",
                  borderRadius: "8px",
                }}
              >{propDetails.amenitiesJoins && propDetails.amenitiesJoins.map((amenities) => (
                <Grid sm={3} xs={6} key={amenities.amenitiesId}>
                  <p style={{ fontSize: "12px" }}>{amenities.name}</p>
                </Grid>
              ))}
              </Grid>
            </Grid>
            <Grid>
              {roomDetails && roomDetails.map((room, roomIndex) => (
                <Card className={classes.cardPrice} key={room.roomId}>
                  <Grid
                    container
                    direction="row"
                    // spacing={2}
                    // justifyContent="flex-start"
                    xs={12}
                  >
                    <Grid sm={3} xs={12}>
                      {room.roomsImageDetails && room.roomsImageDetails.length != 0 ? <p className={classes.rooomcat} onClick={() => handleModalOpen(room)}>{room.roomCategoryName}</p> : <p className={classes.rooomcat} >{room.roomCategoryName}</p>}
                      <p>{room.name}</p>
                      <p className={classes.bed}>{room.beds} Beds&nbsp;&nbsp;<span >< BedIcon style={{ marginBottom: "-5px", fontSize: "20px" }} /></span></p>
                      <p className={classes.bed}>{room.guests} Guests&nbsp;&nbsp;<span >< PersonIcon style={{ marginBottom: "-5px", fontSize: "20px" }} /></span></p>
                    </Grid>
                    <Modal
                      open={open}
                      onClose={handleModalClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className={classes.modalbox}>
                        <Carousel images={roomImages} className={classes.glary} />
                      </Box>
                    </Modal>
                    <Grid sm={4} xs={12}>
                      <div className={classes.servicegrid}>
                        {room.facilityJoins && room.facilityJoins.map((facility) => (
                          <p className={classes.service}>{facility.roomFacilityName}</p>
                        ))}
                      </div>
                    </Grid>
                    <Grid sm={3} xs={12}>
                      <p>{room.cancellationPolicy}</p>
                    </Grid>
                    <Grid sm={2} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select No of Rooms</InputLabel>
                        <Select
                          style={{ fontSize: "14px" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={room.noofroom}
                          label="No of rooms"
                          onChange={(e) => handleRoomCatChange(e, room, roomIndex)}
                        >
                          {room.roomsLeft ? [...Array(parseInt(room.roomsLeft))].map((e, i) => {
                            return <MenuItem style={{ fontSize: "14px" }} key={i} value={i + 1}>{i + 1}</MenuItem>
                          }) : <MenuItem style={{ fontSize: "14px" }} value="1">1</MenuItem>}
                        </Select>
                      </FormControl>
                      <p style={{ fontSize: "14px", fontWeight: "bold", color: "rgb(13, 74, 67)", paddingTop: "20px" }}>
                        {room.specialPrice && room.specialPrice >=0 && room.specialPrice <= 100 ?
                        <>
                          <p style={{ textDecoration: "line-through",color:"red"}}>₹ {room.price} / Night</p>
                          {/* <p>Discount : {room.specialPrice} %</p> */}
                          <p >₹ {specialPriceCalculation(room.price,room.specialPrice)} / Night</p>
                        </> :
                        <span>₹ {room.price} / Night</span>} </p>
                      {/* <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{
                          backgroundColor: "#0d4a43",
                          color: "white",
                          boxShadow: "none",
                          marginTop: "10px 0px 10px 0px",
                        }}
                        onClick={() => handleAddToReserve(room, roomIndex)}
                      >
                        {!room.isReserved ? "Add to Reserve" : "Remove"}
                      </Button> */}
                      {!room.isReserved ? <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{
                          backgroundColor: "#0d4a43",
                          color: "white",
                          boxShadow: "none",
                          marginTop: "10px 0px 10px 0px",
                        }}
                        onClick={() => handleAddToReserve(room, roomIndex)}
                      >
                        Add to Reserve
                      </Button> : <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{
                          backgroundColor: "#850808",
                          color: "white",
                          boxShadow: "none",
                          marginTop: "10px 0px 10px 0px",
                        }}
                        onClick={() => handleAddToReserve(room, roomIndex)}
                      >
                        Remove
                      </Button>}
                    </Grid>
                  </Grid>
                </Card>
              ))}

            </Grid>

            {/* Map Area */}

            <Grid>
              <Grid
                container
                direction="row"
                xs={12}>
              </Grid>
            </Grid>
            
          </Grid>

          <Grid sm={3} xs={12} className={classes.gridsapce} style={{ paddingLeft: "20px" }}>
            <div
              style={{
                border: "solid 1px #d9d9d9",
                borderRadius: "8px",
                padding: "15px 10px 15px 10px",
                position: "sticky",
                top: 100,
                boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px"
              }}
            >
              <p style={{ fontWeight: "bold" }}>Price Details</p>
              <div className={classes.dates}>
                <div className={classes.picker}>
                  <DateRangePicker
                    style={{zIndex:999}}
                    startDate={checkInDate}
                    startDateId="start_date_id"
                    endDate={checkOutDate}
                    endDateId="end_date_id"
                    onDatesChange={({ startDate, endDate }) => {
                      onDateChange(startDate, endDate)
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    numberOfMonths={2}
                    displayFormat="DD-MM-YYYY"
                    isOutsideRange={day => moment(day).isBefore(moment(), 'day')}
                    block={true}
                    orientation={window.innerWidth > 600 ? HORIZONTAL_ORIENTATION : VERTICAL_ORIENTATION }
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    className={classes.picker}
                      label="Check In"
                      inputFormat="dd/MM/yyyy"
                      disablePast
                      // disabled
                      value={checkInDate}
                      onChange={(newValue) => {
                        onDateChange(newValue, 'checkInDate')
                      }}
                      renderInput={(params) => <TextField {...params} className={classes.picker} />}
                    />
                  </LocalizationProvider> */}
                </div>
                {/* <div className={classes.picker}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    className={classes.picker}
                      label="Check Out"
                      inputFormat="dd/MM/yyyy"
                      disablePast
                      // disabled
                      value={checkOutDate}
                      onChange={(newValue) => {
                        onDateChange(newValue, 'checkoutDate')

                      }}
                      renderInput={(params) => <TextField {...params} className={classes.picker} />}
                    />
                  </LocalizationProvider>
                </div> */}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    paddingTop: "10px",
                  }}
                >
                  Guest
                </p>
                {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
                <Box style={{ width: "100%" }}>
                  <Button
                    aria-describedby={idPopover}
                    variant="outlined"
                    onClick={handleClickPopover}
                    style={{
                      width: "100%",
                      padding: 10,
                      borderColor: "#a0a0a0",
                      color: "#a0a0a0",
                      fontSize: 13,
                      textTransform: "lowercase",
                    }}
                  // disabled
                  >
                    {`${adults} adults • ${children} children • ${rooms} rooms`}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="sm"
                      style={{ position: "relative", left: 20 }}
                    />
                  </Button>
                  <Popover
                    id={idPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <DropDownElement
                      title={"Adults"}
                      value={adults}
                      setValue={setAdults}
                    />
                    <DropDownElement
                      title={"Children"}
                      value={children}
                      setValue={setChildren}
                    />
                    <DropDownElement
                      title={"Rooms"}
                      value={rooms}
                      setValue={setRooms}
                    />
                  </Popover>
                </Box>
              </div>


              {reservedRoomDetails.length !== 0 && <div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      paddingTop: "10px",
                    }}
                  >
                    Price{" "}
                  </p>
                  <div
                    style={{
                      backgroundColor: "#f6f7f9",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    {reservedRoomDetails.map((resRoom, resRoomIndex) => (
                      <Grid key={resRoom.roomId}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >

                          <Grid>
                            <p style={{ fontSize: "12px" }}>
                              {resRoom.roomCategoryName} <span>x {resRoom.noofroom}</span>
                            </p>

                          </Grid>
                          <Grid>
                            <p style={{ fontSize: "13px" }}>{resRoom.price}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid>
                        <p style={{ fontSize: "12px" }}>
                          gst {propDetails.tax} %
                        </p>
                      </Grid>
                      <Grid>
                        <p style={{ fontSize: "12px",fontWeight:"bold" }}>{gstAmount}</p>
                      </Grid>
                    </Grid>
                    {/* <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid>
                      <Typography style={{ fontSize: "12px" }}>
                        Service fee
                      </Typography>
                    </Grid>
                    <Grid>
                      <p style={{ fontSize: "13px" }}>100</p>
                    </Grid>
                  </Grid> */}

                  </div>
                </div>
                <br />
                
                <TextField label="Promo code" varient="outlined" fullWidth
                name='promocode'
                type="text"
                  value={promocode}
                  onChange={(e) => onTextChangeProperty(e)}/>
                  <Button
                  variant="contained"
                  size="small"
                  disabled={!enableDiscountBtn}
                  onClick={BypromocodeGetDiscount}
                  style={{
                    backgroundColor: "#0d4a43",
                    color: "white",
                    boxShadow: "none",
                    marginTop: "8px",
                  }}
                >
                  Apply
                </Button>
                  
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ padding: "10px 0px 10px 0px" }}
                >
                  {discountValue > 0 ?
                    (<>
                      <Grid container
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid>
                          <Typography style={{ fontSize: "8px !important", }}>
                            Amount
                          </Typography>
                        </Grid><Grid>
                          <Typography style={{ fontSize: "8px !important", }}>
                            {totalPaidbeforeDiscount}
                          </Typography>
                        </Grid>

                      </Grid>

                      <Grid container
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid>
                          <Typography style={{ fontSize: "8px !important", }}>
                            Discount
                          </Typography>
                        </Grid><Grid>
                          <Typography style={{ fontSize: "8px !important", }}>
                            -{discountValue}%
                          </Typography>
                        </Grid>
                      </Grid>

                    </>) : ''}


                  
                  <Grid>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Total amount
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                      {totalPaid}
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#0d4a43",
                    color: "white",
                    boxShadow: "none",
                    marginTop: "10px 0px 10px 0px",
                  }}
                >
                  Book Now
                </Button>
              </div>
              }
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}


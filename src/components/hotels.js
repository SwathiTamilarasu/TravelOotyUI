import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Container, SwipeableDrawer, TextField, IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Imglist from "../images/imglist.png";
import Rating from "@mui/material/Rating";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import addWeeks from "date-fns/addWeeks";
import Header from "./header";
import Footer from "./footer";
import Pagination from "@mui/material/Pagination";
import Loader from '../Utils/loader';
import { CONFIG } from "../Utils/config";
import Checkin from "./checkin";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import * as moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5000,
    label: "5000",
  },
  {
    value: 10000,
    label: "10000",
  },
  {
    value: 15000,
    label: "15000",
  },
  {
    value: 20000,
    label: "20000",
  },
  {
    value: 25000,
    label: "25000",
  },
  {
    value: 30000,
    label: "30000",
  },
];

const useStyles = makeStyles({
  root: {
    paddingTop: 50,
    backgroundColor: "#f6f8fc",
    // '& MuiOutlinedInput-root':{
    //   borderRadius:"15px!important",
    //   border:"none!important",
    //   fontSize:"14px!important"
    // }
  },
  gridsapce: {

    "@media (max-width: 1100px)": {
      paddingTop: 30,

    },
    "@media (min-width: 1100px)": {
      paddingTop: 30,

    }
  },
  fromdate: {
    borderRight: "none",
    padding: "12px 0px 12px 35px",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderTop: "1px solid lightgrey",
    borderLeft: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
  },
  todate: {
    borderLeft: "none",
    padding: "12px 10px 12px 0px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid lightgrey",
    borderRight: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
  },
  person: {
    padding: "15px 40px 15px 40px",
    border: "1px solid lightgrey",
    borderRadius: "5px",
    color: "grey",
    fontSize: "13px",
  },
  findhotelbtn: {
    backgroundColor: "rgb(13, 74, 67)",
    color: "white",
    fontSize: "12px",
    border: "none",
    padding: "12px 20px 12px 20px",
    borderRadius: "5px",
    marginRight: "15px",
  },
});
function valuetext(value) {
  return `${value}°C`;
}
function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}
const minDistance = 10;

export default function Hotels() {
  let localCheckIn = localStorage.getItem('checkinDate') === null ? moment() : moment(localStorage.getItem('checkinDate'));
  let localCheckOut = localStorage.getItem('checkoutDate') === null ? moment().add(1, 'days') : moment(localStorage.getItem('checkoutDate'));
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [propDetails, setPropDetails] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectAminitites, setSelectAminitites] = useState([]);
  const [selectPropType, setSelectPropType] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [searchName, setSearchName] = useState();
  const [slideValue, setSlideValue] = useState([0, 30000]);
  const [checkInDate, setCheckInDate] = React.useState(localCheckIn);
  const d = new Date();
  const [checkOutDate, setCheckOutDate] = React.useState(localCheckOut);
  const [dataPage, setDataPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  useEffect(() => {
    getPropertyDetails(selectCity, selectAminitites, selectPropType, slideValue, checkInDate, checkOutDate, searchName)
    getPropertyType()
    getCities()
    getAminities()
    //setPage(0);
  }, [dataPage])

  const onDataPageChange = (event, page) => setDataPage(page - 1);

  const childToParent = (childCheckInDate, childCheckOutDate) => {
    setCheckInDate(childCheckInDate);

    setCheckOutDate(childCheckOutDate)
    getPropertyDetails(selectCity, selectAminitites, selectPropType, slideValue, childCheckInDate, childCheckOutDate, searchName)
  }
  const getPropertyDetails = async (selectCity, selectAminitites, selectPropType, slideValue, checkInDate, checkOutDate, searchName) => {
    let cityValue = undefined;
    let aminValue = undefined;
    let propValue = undefined;
    let priceValue = undefined;
    let checkinout = undefined;
    let checkinDateValue = undefined;
    let checkOutDateValue = undefined;
    if (slideValue.length !== 0) {
      priceValue = slideValue;
    }
    if (selectCity.length !== 0) {
      cityValue = selectCity;
    }
    if (selectAminitites.length !== 0) {
      aminValue = selectAminitites;
    }
    if (selectPropType.length !== 0) {
      propValue = selectPropType
    }
    if (checkInDate != undefined) {
      checkinDateValue = moment(checkInDate).format('MM-DD-YYYY');
    }
    if (checkOutDate != undefined) {
      checkOutDateValue = moment(checkOutDate).format('MM-DD-YYYY');
    }
    if (checkinDateValue != undefined && checkOutDateValue != undefined) {
      checkinout = `${checkinDateValue},${checkOutDateValue}`
    }
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Property?filter=Price=${priceValue}ANDCityId=${cityValue}ANDamenitiesjoins=${aminValue}ANDproperttype=${propValue}ANDcheckinout=${checkinout}ANDname=${searchName}`)
      .then(res => {
        const slicedData = res.data.slice(dataPage * rowsPerPage, dataPage * rowsPerPage + rowsPerPage)
        setPropDetails(slicedData);
        setPageCount(Math.ceil(res.data.length / rowsPerPage))
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }
  const getPropertyType = async () => {
    await axios.get(CONFIG.API_URL + 'PropertyType/all')
      .then(res => {
        res.data.map((propTypeDetail) => {
          propTypeDetail.selected = false;
        })
        setPropertyType(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getCities = async () => {
    await axios.get(CONFIG.API_URL + 'Cities/all')
      .then(res => {
        setCityList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getAminities = async () => {
    await axios.get(CONFIG.API_URL + 'Amenities/all')
      .then(res => {
        setAmenities(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const onCityChange = (e, cityId, index) => {
    const { checked } = e.target;
    let citydata = [...selectCity];
    let newArray = [...cityList];
    if (checked === true) {
      citydata.push(cityId);
    } else {
      citydata = citydata.filter(value => value !== cityId);
    }
    newArray[index].isChecked = checked;
    setCityList(newArray);
    setSelectCity(citydata);
    getPropertyDetails(citydata, selectAminitites, selectPropType, slideValue, checkInDate, checkOutDate, searchName)
  }
  const nameSearch = () => {
    getPropertyDetails(selectCity, selectAminitites, selectPropType, slideValue, checkInDate, checkOutDate, searchName)

  }
  const onAminitiesChange = (e, amenitiesId, index) => {
    const { checked } = e.target;
    let dat = [...selectAminitites];
    let newArray = [...amenities];
    if (checked === true) {
      dat.push(amenitiesId);
    } else {
      dat = dat.filter(value => value !== amenitiesId);
    }
    newArray[index].isChecked = checked;
    setAmenities(newArray);
    setSelectAminitites(dat);
    getPropertyDetails(selectCity, dat, selectPropType, slideValue, checkInDate, checkOutDate, searchName)
  }
  const handlePropTypeAdd = (e, propTypeId, index) => {
    let dat = [...selectPropType];
    let newArray = [...propertyType];
    newArray[index].selected = !newArray[index].selected;
    if (newArray[index].selected === true) {
      dat.push(propTypeId);
    } else {
      dat = dat.filter(value => value !== propTypeId);
    }
    setPropertyType(newArray);
    setSelectPropType(dat);
    getPropertyDetails(selectCity, selectAminitites, dat, slideValue, checkInDate, checkOutDate, searchName)
  }
  const handleSlideChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    // if (newValue[1] - newValue[0] < minDistance) {
    //   if (activeThumb === 0) {
    //     const clamped = Math.min(newValue[0], 100 - minDistance);
    //     setSlideValue([clamped, clamped + minDistance]);
    //   } else {
    //     const clamped = Math.max(newValue[1], minDistance);
    //     setSlideValue([clamped - minDistance, clamped]);
    //   }
    // } else {
    //   console.log(newValue)
    //   setSlideValue(newValue);
    // }

    setSlideValue(newValue);
    getPropertyDetails(selectCity, selectAminitites, selectPropType, newValue, checkInDate, checkOutDate, searchName)
  };

 

  const specialPriceCalculation = (originalAmount, discountpercentt) => {
    const discountAmount = (discountpercentt / 100) * originalAmount;
    return Math.round(originalAmount - discountAmount);
  };




  // const HotelFilter = () => {
  //   return (
  //     <div>
  //       <div
  //         style={{
  //           backgroundColor: "#f7f7f7",
  //           padding: "20px",
  //           borderRadius: "8px",
  //         }}
  //       >
  //         <Typography style={{ color: "#1c4076", fontWeight: "bold" }}>
  //           Price Range
  //         </Typography>
  //         <Box style={{ padding: "20px 20px 0px 20px" }}>
  //           <Box sx={{ width: 300 }}>
  //           </Box>
  //         </Box>

  //       </div>

  //       <div
  //         style={{
  //           backgroundColor: "#f7f7f7",
  //           padding: "20px",
  //           borderRadius: "8px",
  //           marginTop: "20px",
  //         }}
  //       >
  //         <Typography
  //           style={{ color: "#1c4076", fontWeight: "bold", fontSize: "12px" }}
  //         >
  //           Location
  //         </Typography>
  //         <FormGroup>
  //           {cityList ? cityList.map((n, index) => {
  //             return (
  //               <FormControlLabel key={n.cityId}
  //                 style={{ marginBottom: "-7px" }}
  //                 control={<Checkbox id={n.cityId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} checked={n.isChecked} onChange={(e) => { onCityChange(e, n.cityId, index) }} />}
  //                 label={
  //                   <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
  //                     {n.name}
  //                   </Typography>
  //                 }
  //                 sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
  //               />
  //             )
  //           }) : ""}
  //         </FormGroup>
  //         <Typography
  //           style={{
  //             color: "#1c4076",
  //             fontWeight: "bold",
  //             paddingTop: "20px",
  //             fontSize: "12px",
  //           }}
  //         >
  //           Aminities
  //         </Typography>
  //         <FormGroup>
  //           {amenities ? amenities.map((n, index) => {
  //             return (
  //               <Grid item xs={3} key={n.id}>
  //                 <FormControlLabel
  //                   control={
  //                     <Checkbox id={n.amenitiesId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} checked={n.isChecked} onChange={(e) => { onAminitiesChange(e, n.amenitiesId, index) }} />
  //                   }
  //                   label={
  //                     <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
  //                       {n.name}
  //                     </Typography>
  //                   }
  //                   sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
  //                 />
  //               </Grid>
  //             );
  //           }) : ''}
  //         </FormGroup>
  //       </div>
  //     </div>
  //   )
  // };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      {/* <HotelFilter /> */}
    </Box>
  );

  const HotelItem = (props) => {
    const price = props.rooms.map(object => {
      return object.regularPrice;
    });
    const maxPrice = Math.max(...price);
    const minPrice = Math.min(...price);
    const roomdiscount = props.rooms.find((rom) => rom.regularPrice == minPrice)
    console.log(roomdiscount )
    return (
      <div style={{ marginLeft: "20px", marginBottom: "20px" }} key={props.propertyID}>
        <Grid
          container
          xs={12}
          style={{
            borderRadius: "12px",
            padding: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px"
          }}
        >
          <Grid sm={4} xs={12}>
            <img
              src={props.imagePath || Imglist}
              alt="blog"
              class="img-responsive"
              style={{ width: "300px", height: "200px", borderRadius: "8px" }}
            />
          </Grid>
          <Grid sm={8} xs={12} container justifyContent="space-between">
            <Grid
              xs={9}
              style={{ padding: "10px" }}
              container
              direction="column"
              justifyContent="space-between"
            >
              <Grid>
                <p
                  style={{
                    color: "#1c4076",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {props.name}
                </p>
                <p style={{ fontSize: "13px", textTransform: "capitalize" }}>
                  <span><LocationOnSharpIcon style={{ fontSize: "18px", color: "rgb(13, 74, 67)", marginBottom: "-3px" }} /></span>  {props.address}
                </p>
                {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {props.amenitiesJoins.map(amenityValue => (
                    <p key={amenityValue.amenitiesId}
                      style={{
                        fontSize: "10px",
                        border: "1px solid #f7f7f7",
                        padding: "3px 6px 3px 6px",
                        backgroundColor: "#f7f7f7",
                        borderRadius: "3px",
                        color: "#1c4076",
                        margin: "5px",
                      }}
                    >
                      {amenityValue.name}
                    </p>
                  ))}

                
                </div>  specialPrice*/}
              </Grid>
              {price.length !== 0 && <Grid>
                {roomdiscount.specialPrice && roomdiscount.specialPrice >=0 && roomdiscount.specialPrice <= 100
                ?  <>
                    {/* <p>Discount : {roomdiscount.specialPrice} %</p> */}
                    <span style={{display:"flex"}}>
                    <p style={{ color: "red", fontWeight: "bold", textDecoration: "line-through" }}>
                    ₹ &nbsp;{minPrice}&nbsp;/ night</p>&nbsp;&nbsp;&nbsp;
                   
                    <p style={{ color: "rgb(53 53 53)", fontWeight: "bold" }}>
                    ₹ &nbsp;{specialPriceCalculation(minPrice,roomdiscount.specialPrice)}&nbsp;/ night</p></span>
                    </>
                :   <p style={{ color: "rgb(53 53 53)", fontWeight: "bold" }}>
                {" "}₹ &nbsp;{minPrice}&nbsp;/ night </p>}
               

              </Grid>}

              {/* {minPrice == maxPrice ? <p style={{ color: "rgb(53 53 53)", fontWeight: "bold" }}>
                  {" "}
                  ₹ &nbsp;{minPrice}&nbsp;/ night

                </p> : <p style={{ color: "rgb(53 53 53)", fontWeight: "bold" }}>
                  {" "}
                  ₹&nbsp;{minPrice} - ₹&nbsp;{maxPrice} &nbsp;/ Night

                </p>} */}
            </Grid>
            <Grid
              xs={3}
              style={{ padding: "10px" }}
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {/* <Rating name="customized-10" defaultValue={1} max={1} /> */}
                <p
                  style={{
                    fontSize: "10px",
                    color: "#1c4076",
                    paddingTop: "5px",
                  }}
                >
                  {/* {props.propertyType.name} */}
                </p>
              </Grid>
              <Grid>
                <Link target="_blank" to={`/hotelinfo/${props.propertyID}`} style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(13, 74, 67)",
                      color: "white",
                      boxShadow: "none",
                      textTransform: "capitalize",
                      fontSize: "10px"
                    }}
                  >
                    Check Availability
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <Container>
        <Grid className={classes.gridsapce}>
          <Checkin childToParent={childToParent} />
        </Grid>


        <Grid className={classes.gridsapce} xs={12} sm={12}>
          <Stack direction="row" spacing={3} style={{ flexWrap: "wrap", margin: "5px" }}>
            {propertyType ? propertyType.map((n, index) => {
              return (
                <Chip key={n.propertyTypeId}
                  label={n.name}
                  color={n.selected == true ? "primary" : "default"}
                  clickable={true}
                  onClick={(e) => handlePropTypeAdd(e, n.propertyTypeId, index)}
                  variant="outlined"
                  style={{
                    fontSize: "12px",
                    padding: "0px 5px 0px 5px",
                    cursor: "pointer",
                    margin: "5px",
                    backgroundColor: "white"
                  }}
                />
              )
            }) : ""}

          </Stack>
        </Grid>
        <Grid
          style={{ display: "flex" }}
          spacing={2}
          container
          className={classes.gridsapce}
        >
          {['bottom'].map((anchor) => (
            <Grid sx={{ display: { xs: 'block', md: 'none' } }} key={anchor}>
              <Button size="large" style={{ height: "50px", fontSize: "14px", position: "fixed", bottom: 0, left: 0, backgroundColor: "white", color: "black", zIndex: 999, border: "1px solid black" }} fullWidth onClick={toggleDrawer(anchor, true)}>
                Filter
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </Grid>
          ))}
          <Grid xs={12} sm={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "100%" }}>
                  <TextField id="outlined-basic" label="Search Hotel" variant="outlined" style={{ width: "100%", marginBottom: "15px", backgroundColor: "white", border: "none" }}
                    value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div>
                  <IconButton style={{ backgroundColor: "white", borderRadius: "5px", height: "75%", backgroundColor: "#0d4a43", color: "white" }} onClick={() => nameSearch()}>
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px"
                }}
              >
                <Typography style={{ color: "rgb(13, 74, 67)", fontWeight: "bold" }}>
                  Price Range
                </Typography>
                <Box style={{ padding: "20px 0px" }}>
                  <Box sx={{ width: '100%' }}>
                    <Slider
                      getAriaLabel={() => 'Minimum distance shift'}
                      value={slideValue} direction
                      // onChange={handleSlideChange}
                      aria-label="Custom marks"
                      onChangeCommitted={handleSlideChange}
                      valueLabelDisplay="on"
                      getAriaValueText={valuetext}
                      min={0}
                      max={30000}
                      marks={marks}
                      style={{ color: "rgb(13, 74, 67)" }}
                    // sx={{ "& .MuiSvgIcon-root": { fontSize: 20,borderColor:"rgb(13, 74, 67)",color:"rgb(13, 74, 67)"  } }}
                    //  disableSwap
                    />
                  </Box>
                </Box>

              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
                  padding: "20px",
                  borderRadius: "12px",
                  marginTop: "20px",
                  // border:"1px solid rgb(13, 74, 67)"
                }}
              >
                <Typography
                  style={{ color: "rgb(13, 74, 67)", fontWeight: "bold", fontSize: "12px" }}
                >
                  Location
                </Typography>
                <FormGroup>
                  {cityList ? cityList.map((n, index) => {
                    return (
                      <FormControlLabel key={n.cityId}
                        style={{ marginBottom: "-7px" }}
                        control={<Checkbox id={n.cityId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20, borderColor: "rgb(53, 53, 53)", color: "rgb(53, 53, 53)" } }} checked={n.isChecked} onChange={(e) => { onCityChange(e, n.cityId, index) }} />}
                        label={
                          <Typography style={{ fontSize: "13px", color: "rgb(53, 53, 53)" }}>
                            {n.name}
                          </Typography>
                        }
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                    )
                  }) : ""}
                </FormGroup>
                <Typography
                  style={{
                    color: "rgb(13, 74, 67)",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    fontSize: "12px",
                  }}
                >
                  Hotel Facilities
                </Typography>
                <FormGroup>
                  {amenities ? amenities.map((n, index) => {
                    return (
                      <Grid item xs={12} key={n.id}>
                        <FormControlLabel
                          control={
                            <Checkbox id={n.amenitiesId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20, borderColor: "rgb(53, 53, 53)", color: "rgb(53, 53, 53)" } }} checked={n.isChecked} onChange={(e) => { onAminitiesChange(e, n.amenitiesId, index) }} />
                          }
                          label={
                            <Typography style={{ fontSize: "13px", color: "rgb(53, 53, 53)" }}>
                              {n.name}
                            </Typography>
                          }
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        />
                      </Grid>
                    );
                  }) : ''}
                </FormGroup>
              </div>
            </div>
          </Grid>
          <Grid sm={9} xs={12}>
            {propDetails
              .map((row) => (
                HotelItem(row)
                // <HotelItem  propDet={row}/>
              )
              )}

          </Grid>

        </Grid>
        <Grid xs={12}>
          <Stack
            spacing={2}
            style={{ position: "relative", float: "right", marginRight: 20, marginTop: 20, paddingBottom: 20 }}
          >
            <Pagination
              count={pageCount}
              onChange={onDataPageChange}
              page={dataPage + 1}
            />
          </Stack>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

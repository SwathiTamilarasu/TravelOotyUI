import React, { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Avatar, Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./propertyForm.css";
import Header from "./header";
import ImageUploading from "react-images-uploading";
import axios from 'axios';
import { CONFIG } from "../Utils/config";
import { parse } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Loader from '../Utils/loader';
import MaxWidthDialog from '../Utils/dialog';
const useStyles = makeStyles({
  root: {
    marginTop: 50,
    marginBottom: 100,
  },
  gridspace: {
    marginLeft: 180,
    marginRight: 180,
  },
  gly: {
    height: 300,
    overflow: "scroll",
  },
  frm: {
    margin: "5px 0px 5px 0px",
  },
  iconContainer: {
    transform: "scale(2)",
  },
});

function getSteps() {
  return ["Property Details", "Amenities", "Room Details"];
}




export default function PropertyForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const [images, setImages] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [totalRoomsDetails, setTotalRoomsDetails] = useState([]);
  const [roomCategories, setRoomCategories] = useState([]);
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: '',
    propertierName: '',
    propertyType: '',
    address: '',
    city: '',
    postalCode: '',
    totalRooms: 0,
    email: '',
    phoneNumber: '',
    checkInOut: '',
    frontDeskTime: '',
    propertyDesc: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    tax: "",
    lat : "",
    lng : ""
  });
  const [selectAminitites, setSelectAminitites] = useState([]);
  const [aminitiesId, setAminitiesId] = useState([]);
  const [cityList, setCityList] = useState([])
  const [propFormerrors, setPropFormErrors] = useState({});
  const [roomNoError, setRoomNoError] = useState(false);
  const [roomErrors, setRoomErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setIsImageUpload(true)
    setImages(imageList);
  };
  const onImageRemove = (index, imageDet, imageList) => {
    setIsImageUpload(false);
    setImages([]);
  }
  const getCities = async () => {
    await axios.get(CONFIG.API_URL + 'Cities/all')
      .then(res => {

        console.log(res.data);
        setCityList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const onTextChangeProperty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'tax') {
      if (isNaN(value) || value==='') {        
        setPropertyDetails({
          ...propertyDetails, [name]: ""
        })
      } else {
        setPropertyDetails({
          ...propertyDetails, [name]: parseInt(value)
        })
      }
    } else {
      setPropertyDetails({
        ...propertyDetails, [name]: name === "propertyType" || name === "postalCode" || name === "phoneNumber" || name === "city" ? value === "" ? null : parseInt(value) : value
      })
    }

    let errors = {};
    if ((name === "propertyType" || name === "postalCode" || name === "phoneNumber" || name === "city") && value == 0) {
      errors[name] = true;
      setPropFormErrors({ ...propFormerrors, [name]: true })
    } else if (value == "" || value == null || value == undefined) {
      errors[name] = true;
      setPropFormErrors({ ...propFormerrors, [name]: true })
    } else {
      errors[name] = false;
      setPropFormErrors({ ...propFormerrors, [name]: false })
    }

  }



  const getPropertyType = async () => {

    await axios.get(CONFIG.API_URL + 'PropertyType/all')
      .then(res => {
        setPropertyType(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getRoomCategories = async () => {


    await axios.get(CONFIG.API_URL + 'RoomCategories/all')
      .then(res => {
        setRoomCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  const getRoomFacilities = async () => {
    await axios.get(CONFIG.API_URL + 'RoomFacility/all')
      .then(res => {
        setRoomFacilities(res.data);

        let dat = [];
        res.data.map((item, index) => {
          dat.push({
            roomFacilityId: item.roomFacilityId,
            name: item.name,
            isChecked: false
          });
          return dat
        })

        setRoomFacilities(dat);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getAminities = async () => {

    await axios.get(CONFIG.API_URL + 'Amenities/all')
      .then(res => {

        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i].push({
        //     isChecked: false
        //   })
        // }
        let dat = [];
        res.data.map((item, index) => {
          dat.push({
            amenitiesId: item.amenitiesId,
            name: item.name,
            isChecked: false
          });
          return dat
        })

        setAmenities(dat);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  const onAminitiesChange = (e, amenitiesId, isChecke) => {
    // amenities.filter()
    const { name } = e.target;
    if (isChecke === true) {
      const elementsIndex = amenities.findIndex(element => element.amenitiesId == amenitiesId);
      let newArra = [...amenities];
      newArra[elementsIndex].isChecked = !isChecke;
      setAmenities(newArra);
      let newArray = [...selectAminitites];
      const index = newArray.findIndex(element => element.roomFacilityId == amenitiesId);
      newArray.splice(index, 1);
      setSelectAminitites(newArray)
    }
    else {
      const elementsIndex = amenities.findIndex(element => element.amenitiesId == amenitiesId);
      let newArray = [...amenities];
      newArray[elementsIndex].isChecked = !isChecke;
      setAmenities(newArray);
      let dat = [...selectAminitites];
      dat.push({
        "amenitiesId": parseInt(amenitiesId),
        "propertyID": 0
      });
      setSelectAminitites(dat);

    }

    // let positive_array = amenities.filter(value.amenitiesId => val >= 0);

  }
  const onFacilityChange = (e, index, roomindex, val) => {
    const { name, value } = e.target;

    const list = [...totalRoomsDetails];

    list[index][name][roomindex].isChecked = val !== undefined ? val : value;
    if (val == true) {
      list[index].facilityJoins.push({
        "roomFacilityId": parseInt(list[index][name][roomindex].roomFacilityId),
        "roomId": 0
      })
    } else {
      list[index].facilityJoins.splice(roomindex, 1)
    }

    setTotalRoomsDetails(list);
  };

  useEffect(() => {

    getPropertyType();
    getAminities();
    getRoomCategories();
    getRoomFacilities();
    getCities();
  }, [])

  const onChangeRoomDetails = (e, roomName, index) => {

    const { name, value } = e.target;
    const elementsIndex = totalRoomsDetails.findIndex(element => element.name == roomName);
    let newArr = [...totalRoomsDetails];
    newArr[index][name] = name === "roomCategoryId" ? parseInt(value) : value;
    setTotalRoomsDetails(newArr)
    if (name == "name" || name == "regularPrice" || name == "beds" || name == "guests") {
      if (value == "" || value == undefined || value == null) {
        setRoomErrors((errList) => {
          errList[index][name] = true;
          return errList;
        });
      } else {
        setRoomErrors((errList) => {
          errList[index][name] = false;
          return errList;
        });
      }
    } else if (name == "roomCategoryId") {
      if (value == 0 || value == undefined || value == null) {
        setRoomErrors((errList) => {
          errList[index][name] = true;
          return errList;
        });
      } else {
        setRoomErrors((errList) => {
          errList[index][name] = false;
          return errList;
        });
      }
    }


  }

  const onTextChange = (e) => {

    const { name, value } = e.target;
    let count = parseInt(e.target.value);
    if (value == 0) {
      setRoomNoError(true)
    } else {
      setRoomNoError(false)
    }
    let roomCount = [];
    let roomError = [];
    for (var i = 0; i < count; i++) {
      roomCount.push({
        "roomId": 0,
        "propertyID": 0,
        "name": 'Room ' + (i + 1),
        "regularPrice": '',
        "specialPrice": '',
        "roomCategoryId": 0,
        "guests": 0,
        "beds": 0,
        "createdBy": localStorage.getItem('userId'),
        // "facilityJoins": [
        //   {
        //     "roomFacilityId": 0,
        //     "roomId": 0
        //   }
        // ]

        "facilityJoins": [],
        "roomfacilityJson": [],
        "numberOfRoomsCategory": '',
        "cancellationPolicy": '',
      })
      roomError.push({
        'name': false,
        'roomCategoryId': false,
        'regularPrice': false
      })
    }
    roomCount.map((roomValue, roomIndex) => {
      roomFacilities.map((facivalue, faciIndex) => {
        roomValue.roomfacilityJson.push({
          roomFacilityId: facivalue.roomFacilityId,
          name: facivalue.name,
          isChecked: false
        })
      })
    })
    setTotalRoomsDetails(roomCount);
    setRoomErrors(roomError)
    setPropertyDetails({
      ...propertyDetails, [name]: value
    })


  }
  const validate = () => {
    let errors = {};
    if (!propertyDetails.propertyName) {
      errors.propertyName = true;
    }
    if (!propertyDetails.propertierName) {
      errors.propertierName = true;
    }
    if (!propertyDetails.propertyType) {
      errors.propertyType = true;
    }
    if (!propertyDetails.address) {
      errors.address = true;
    }
    if (!propertyDetails.city) {
      errors.city = true;
    }
    if (!propertyDetails.postalCode) {
      errors.postalCode = true;
    }
    if (!propertyDetails.phoneNumber) {
      errors.phoneNumber = true;
    }
    if (!propertyDetails.email) {
      errors.email = true;
    }
    if (!propertyDetails.tax) {
      errors.tax = true;
    }
    setPropFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = () => {
    let finalError = false;
    if (propertyDetails.totalRooms == 0) {
      setRoomNoError(true)
      finalError = true;
    } else {
      setRoomNoError(false)
    }
    let errors = [];
    totalRoomsDetails.map((el, index) => {
      errors.push({
        'name': false,
        'roomCategoryId': false,
        'regularPrice': false
      })
      if (el.name == "" || el.name == undefined || el.name == null) {
        finalError = true;
        errors[index].name = true
      }
      if (el.roomCategoryId == 0 || el.roomCategoryId == undefined || el.roomCategoryId == null) {
        finalError = true;
        errors[index].roomCategoryId = true
      }
      if (el.regularPrice == "" || el.regularPrice == undefined || el.regularPrice == null) {
        finalError = true;
        errors[index].regularPrice = true
      }
      if (el.beds == "" || el.beds == undefined || el.beds == null) {
        finalError = true;
        errors[index].beds = true
      }
      if (el.guests == "" || el.guests == undefined || el.guests == null) {
        finalError = true;
        errors[index].guests = true
      }
    });
    setRoomErrors(errors);
    if (finalError == false) {
      const rommDetails = totalRoomsDetails;
      rommDetails.map((roomDet, roomIndex) => {
        delete roomDet.roomfacilityJson
      })
      const formData = new FormData();
      formData.append("File", images[0].file, images[0].file.name);
      formData.append("ImageName", images[0].file.name);
      formData.append("propertyID", 0);
      formData.append("name", propertyDetails.propertyName);
      formData.append("propertierName", propertyDetails.propertierName);
      formData.append("propertyTypeId", propertyDetails.propertyType);
      formData.append("address", propertyDetails.address);
      formData.append("cityId", propertyDetails.city);
      formData.append("phoneNumber", propertyDetails.phoneNumber.toString());
      formData.append("email", propertyDetails.email);
      formData.append("packageName", "");
      formData.append("postalCode", propertyDetails.postalCode.toString());
      formData.append("checkInOut", propertyDetails.checkInOut);
      formData.append("frontDeskTime", propertyDetails.frontDeskTime);
      formData.append("propertyDesc", propertyDetails.propertyDesc);
      formData.append("accountName", propertyDetails.accountName);
      formData.append("accountNumber", propertyDetails.accountNumber);
      formData.append("ifscCode", propertyDetails.ifscCode);
      formData.append("tax", propertyDetails.tax);
      formData.append("createdBy", localStorage.getItem('userId'));
      formData.append("totalRooms", 0);
      formData.append("rooms", JSON.stringify(rommDetails));
      formData.append("amenitiesJoins", JSON.stringify(selectAminitites));
      formData.append("approvalStatus", "Registered");
      formData.append("lat", propertyDetails.lat);
      formData.append("lng", propertyDetails.lng);
      // const payLoad = {
      //   "name": propertyDetails.propertyName,
      //   "propertyID": 0,
      //   "propertierName": propertyDetails.propertierName,
      //   "propertyTypeId": propertyDetails.propertyType,
      //   "address": propertyDetails.address,
      //   "cityId": propertyDetails.city,
      //   "phoneNumber": propertyDetails.phoneNumber.toString(),
      //   "email": propertyDetails.email,
      //   "packageName": "",
      //   "imageName": "",
      //   "imagePath": "",
      //   "postalCode": propertyDetails.postalCode.toString(),
      //   "createdBy": localStorage.getItem('userId'),
      //   "totalRooms": 0,
      //   "rooms": totalRoomsDetails,
      //   "amenitiesJoins": selectAminitites,
      //   "file": "",
      //   "approvalStatus": "Registered"
      // }

      setIsLoading(true);
      axios.post(CONFIG.API_URL + 'Property', formData).then(res => {
        if (res.status === 200) {
          setIsLoading(false);
          setIsDialogOpen(!isDialogOpen);
          // navigate('/mainscreen/room');
          handleReset();
        }
      })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          // setError(err.response.data.error)
        });
    }

  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (validate(propertyDetails)) {
      if (images.length != 0) {
        setIsImageUpload(true)
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      } else {
        setIsImageUpload(false)
      }

    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setPropertyDetails({
      propertyName: '',
      propertierName: '',
      propertyType: '',
      address: '',
      city: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
      totalRooms: 0,
      checkInOut: '',
      frontDeskTime: '',
      propertyDesc: '',
      accountName: '',
      accountNumber: '',
      ifscCode: '',
      tax: '',
      lat : "",
      lng : ""
    })
    setTotalRoomsDetails([]);
    setSelectAminitites([]);
    setImages([]);
  };
  return (
    <div className={classes.root}>
      <div className={classes.gridspace}>
        <Header />
        {isLoading && <Loader isLoading={isLoading} />}
        <Grid container>
          <Box sx={{ width: "100%", marginTop: 15 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepOptional(index)) {
                //     labelProps.optional = (
                //         <Typography variant="caption">Optional</Typography>
                //     );
                // }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      {...labelProps}
                      StepIconProps={{
                        classes: {
                          root: classes.iconContainer,
                          completed: classes.completed,
                          active: classes.active,
                          disabled: classes.disabled,
                        },
                      }}
                    >
                      <Typography fontSize={13}>{label}</Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }} fontSize={13} align="center">
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    style={{
                      backgroundColor: "#1d806e",
                      borderColor: "#1d806e",
                      padding: 15,
                      width: 100,
                      fontSize: 12,
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <MaxWidthDialog
                    isDialogOpened={isDialogOpen}
                    handleCloseDialog={() => setIsDialogOpen(false)}
                    title="Information"
                    message=" Data Saved Suceessfully  Will get back to you shortly"
                  />
                  {/* {getStepContent(activeStep, images, setImages)} */}
                  {activeStep == 0 && (<Grid style={{ marginTop: 30 }}>
                    <h5 style={{ color: 'red' }}><span style={{ fontSize: 20 }}></span>* fields are mandatory. </h5>
                    <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
                      <div style={{ width: "100%", marginRight: "20px" }}>
                        <label for="email" style={{ fontSize: 13 }}>
                          Name of the property:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="text" name="propertyName" value={propertyDetails.propertyName} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.propertyName ? 'form-control showError' : 'form-control'} />
                      </div>
                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <label for="email" style={{ fontSize: 13 }}>
                          Propertier Name:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="text" name="propertierName" value={propertyDetails.propertierName} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.propertierName ? 'form-control showError' : 'form-control'} />
                      </div>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px" }}>
                      <label for="email" style={{ fontSize: 13 }}>
                        Property Type:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                      </label>
                      <select name="propertyType" id="sel1" value={propertyDetails.propertyType} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.propertyType ? 'form-control showError' : 'form-control'}>
                        <option value="0">--Select Property Type--</option>
                        {propertyType ? propertyType.map(n => {
                          return (
                            <option key={n.propertyTypeId}

                              value={n.propertyTypeId}>
                              {n.name}
                            </option>
                          );
                        }) : ''}
                      </select>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px" }}>
                      <label for="email" style={{ fontSize: 13 }}>
                        Address:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                      </label>
                      <textarea name="address" value={propertyDetails.address} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.address ? 'form-control showError' : 'form-control'} rows="5" id="comment"></textarea>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
                      <div style={{ width: "100%", marginRight: "20px" }}>
                        <label for="email" style={{ fontSize: 13 }}>
                          Email id:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="text" name="email" value={propertyDetails.email} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.email ? 'form-control showError' : 'form-control'} />
                      </div>

                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <label for="phoneNumber" style={{ fontSize: 13 }}>
                          Phone Number:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="number" name="phoneNumber" value={propertyDetails.phoneNumber} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.phoneNumber ? 'form-control showError' : 'form-control'} />
                      </div>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
                      <div style={{ width: "100%", marginRight: "20px" }}>
                        <label for="town" style={{ fontSize: 13 }}>
                          Town/City:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <select name="city" id="sel1" value={propertyDetails.city} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.city ? 'form-control showError' : 'form-control'}>
                          <option value="0">--Select Town/City--</option>
                          {cityList ? cityList.map(n => {
                            return (
                              <option

                                value={n.cityId}>
                                {n.name}
                              </option>
                            );
                          }) : ''}
                        </select>
                      </div>
                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <label for="postalCode" style={{ fontSize: 13 }}>
                          Postal Code:<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="number" name="postalCode" value={propertyDetails.postalCode} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.postalCode ? 'form-control showError' : 'form-control'} />
                      </div>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
                      <div style={{ width: "100%", marginRight: "20px" }}>
                        <label for="checkInOut" style={{ fontSize: 13 }}>
                          Check In - Check Out Timings:
                        </label>
                        <input type="text" name="checkInOut" value={propertyDetails.checkInOut} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} />
                      </div>

                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <label for="frontDeskTime" style={{ fontSize: 13 }}>
                          Front Desk Timings:
                        </label>
                        <input type="text" name="frontDeskTime" value={propertyDetails.frontDeskTime} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} />
                      </div>
                    </div>
                    <div style={{ margin: "20px 0px 20px 0px" }}>
                      <label for="propertyDesc" style={{ fontSize: 13 }}>
                        About Property:
                      </label>
                      <textarea name="propertyDesc" rows="8" id="comment" value={propertyDetails.propertyDesc} onChange={(e) => onTextChangeProperty(e)} className={'form-control'}></textarea>
                    </div>

                    <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
                      <div style={{ width: "100%", marginRight: "20px" }}>
                        <label for="checkInOut" style={{ fontSize: 13 }}>
                          Latitude:
                        </label>
                        <input type="text" name="lat" value={propertyDetails.lat} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} />
                      </div>

                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <label for="frontDeskTime" style={{ fontSize: 13 }}>
                          Longitude:
                        </label>
                        <input type="text" name="lng" value={propertyDetails.lng} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} />
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ margin: "20px 0px 20px 0px", width: "50%", }}>
                        <label for="accountDet" style={{ fontSize: 13 }}>
                          Account Details:
                        </label>
                        <input type="text" name="accountName" placeholder="Account Holder Name" value={propertyDetails.accountName} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} /><br />
                        <input type="number" name="accountNumber" placeholder="Account Number" value={propertyDetails.accountNumber} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} /><br />
                        <input type="text" name="ifscCode" placeholder="IFSC Code" value={propertyDetails.ifscCode} onChange={(e) => onTextChangeProperty(e)} className={'form-control'} /><br /><br />
                        <label style={{ fontSize: 13 }}>
                          Gst<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </label>
                        <input type="text" name="tax" placeholder="Tax" value={propertyDetails.tax} onChange={(e) => onTextChangeProperty(e)} className={propFormerrors.tax ? 'form-control showError' : 'form-control'} />

                      </div>
                      <Grid style={{ marginTop: 20, marginBottom: 10, marginLeft: "40px" }}>
                        <Typography fontSize={14} fontWeight={"bold"}>
                          Property Image<span style={{ color: 'red', fontSize: 17 }}>*</span>
                        </Typography>
                        <ImageUploading

                          value={images}
                          onChange={onChange}

                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            isDragging,
                            dragProps,
                          }) => (
                            <Grid>
                              <Grid direction={"row"} style={{ display: "flex" }}>
                                {imageList.map((image, index) => (
                                  <Grid key={index} style={{ marginRight: 20 }}>
                                    <img
                                      src={image.data_url}
                                      width={100}
                                      height={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                    <div>
                                      {/* <button onClick={() => onImageUpdate(index)}>
                                  Update
                                </button> */}
                                      <button
                                        onClick={() => onImageRemove(index, image, imageList)}
                                        style={{
                                          position: "absolute",
                                          marginTop: -105,
                                          marginLeft: 85,
                                          borderRadius: 99,
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                      >
                                        x
                                      </button>
                                    </div>
                                  </Grid>
                                ))}
                                {images.length == 0 && <Grid>
                                  <button
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    style={{
                                      borderColor: "transparent",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <img
                                      src={require("../images/add-image-button.png")}
                                      width={100}
                                      height={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </button>
                                  {/* &nbsp;
                            <button onClick={onImageRemoveAll}>
                              Remove all images
                            </button> */}
                                </Grid>}
                                {!isImageUpload && <div style={{ color: 'red' }

                                }>Image is mandatory</div>}
                              </Grid>
                            </Grid>
                          )}
                        </ImageUploading>
                      </Grid>
                    </div>

                  </Grid>)
                  }


                  {activeStep == 1 && (<Grid>
                    <p
                      style={{ fontWeight: "bold", fontSize: "15px", paddingTop: "10px" }}
                    >
                      Hotel aminities
                    </p>
                    <Grid container spacing={2}>
                      {amenities ? amenities.map(n => {
                        return (
                          <Grid item xs={3} key={n.id}>
                            <FormControlLabel
                              control={
                                <Checkbox id={n.amenitiesId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} checked={n.isChecked} onChange={(e) => { onAminitiesChange(e, n.amenitiesId, n.isChecked) }} />
                              }
                              label={n.name}
                            />
                          </Grid>
                        );
                      }) : ''}
                    </Grid>



                  </Grid>
                  )}

                  {activeStep == 2 && (

                    <Grid>
                      <h5 style={{ color: 'red' }}><span style={{ fontSize: 20 }}>*</span> are mandatory fields</h5>
                      <p
                        style={{ fontWeight: "bold", fontSize: "14px", paddingTop: "10px" }}
                      >
                        Total Number of Rooms <span style={{ color: 'red', fontSize: 17 }}>*</span>
                      </p>

                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <input
                            type="number"
                            min={0}
                            name="totalRooms"
                            value={propertyDetails.totalRooms}
                            placeholder="0"
                            onChange={(e) => onTextChange(e)}
                            className={roomNoError ? 'form-control showError' : 'form-control'}
                          />
                        </Grid>
                      </Grid>

                      <p
                        style={{ fontWeight: "bold", fontSize: "14px", paddingTop: "10px" }}
                      >
                        Rooms
                      </p>

                      {totalRoomsDetails ? totalRoomsDetails.map((n, parentIndex) => {
                        return (
                          <Grid id={n.roomId} key={n.id}>
                            <Accordion style={{ marginBottom: "20px", border: "1px solid lightgrey" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    color: "#009182",
                                  }}
                                >
                                  {n.name == "" ? `Room ${parentIndex + 1}` : n.name}
                                </p>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginBottom: "20px" }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={4}>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",


                                      }}
                                    >
                                      Room Name<span style={{ color: 'red', fontSize: 17 }}>*</span>
                                    </p>
                                    <input
                                      type="text"
                                      name="name"
                                      placeholder="Enter Room No/ Name"
                                      className={roomErrors[parentIndex].name ? 'form-control showError' : 'form-control'}
                                      value={n.name}
                                      onChange={(e) => onChangeRoomDetails(e, n.name, parentIndex)}
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Room Category<span style={{ color: 'red', fontSize: 17 }}>*</span>
                                    </p>
                                    <select name="roomCategoryId" value={n.roomCategoryId} id="sel1" onChange={(e) => onChangeRoomDetails(e, n.roomCategoryId, parentIndex)} className={roomErrors[parentIndex].roomCategoryId ? 'form-control showError' : 'form-control'}>
                                      <option value="0">--Select Room Category--</option>
                                      {roomCategories ? roomCategories.map(s => {
                                        return (
                                          <option key={s.roomCategoryId}
                                            value={s.roomCategoryId}>
                                            {s.name}
                                          </option>
                                        );
                                      }) : ''}
                                    </select>



                                  </Grid>
                                  <Grid item xs={3}>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",


                                      }}
                                    >
                                      No of room in this Category
                                    </p>
                                    <input
                                      type="number"
                                      name="numberOfRoomsCategory"
                                      value={n.numberOfRoomsCategory}
                                      onChange={(e) => onChangeRoomDetails(e, n.numberOfRoomsCategory, parentIndex)}
                                      placeholder="No of room in this Category"
                                      className={'form-control'}
                                    />
                                  </Grid>
                                </Grid>


                                <p
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    paddingTop: "20px",
                                  }}
                                >
                                  Room Facilities
                                </p>
                                <Grid container spacing={2}>
                                  {n.roomfacilityJson ? n.roomfacilityJson.map((k, roomindex) => {
                                    return (
                                      <Grid item xs={3} id={k.roomFacilityId + ' ' + n.name} key={roomindex}>
                                        <FormControlLabel id={k.roomFacilityId + ' ' + n.name}
                                          control={
                                            <Checkbox id={k.roomFacilityId + ' ' + n.name} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} name="roomfacilityJson" value={k.roomFacilityId} checked={n.roomfacilityJson[roomindex].isChecked}
                                              onChange={(e) => onFacilityChange(e, parentIndex, roomindex, e.target.checked)} />
                                          }
                                          label={k.name == null ? '' : k.name}
                                        />
                                      </Grid>
                                    );
                                  }) : ''}
                                </Grid>

                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "50%" }}>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        paddingTop: "20px",
                                        marginTop: 20,
                                      }}
                                    >
                                      Regular Price<span style={{ color: 'red', fontSize: 17 }}>*</span>
                                    </p>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <div>
                                          {/* <label for="email">Adult</label> */}
                                          <input
                                            type="number"
                                            placeholder="000000 INR"
                                            name="regularPrice"
                                            value={n.regularPrice}
                                            onChange={(e) => onChangeRoomDetails(e, n.regularPrice, parentIndex)}
                                            className={roomErrors[parentIndex].regularPrice ? 'form-control showError' : 'form-control'}
                                          />
                                        </div>
                                      </Grid>

                                    </Grid>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        paddingTop: "20px",
                                      }}
                                    >
                                      Special Price
                                    </p>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <div>
                                          {/* <label for="email">Adult</label> */}
                                          <input
                                            type="number"
                                            placeholder="000000 INR"
                                            class="form-control"
                                            name="specialPrice"
                                            value={n.specialPrice}
                                            onChange={(e) => onChangeRoomDetails(e, n.specialPrice, parentIndex)}
                                          />
                                        </div>
                                      </Grid>

                                    </Grid>

                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        paddingTop: "20px",
                                        marginTop: 20,
                                      }}
                                    >
                                      No of beds<span style={{ color: 'red', fontSize: 17 }}>*</span>
                                    </p>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <div>
                                          {/* <label for="email">Adult</label> */}
                                          <input
                                            type="number"
                                            placeholder="no of beds"
                                            name="beds"
                                            value={n.beds}
                                            onChange={(e) => onChangeRoomDetails(e, n.beds, parentIndex)}
                                            className={roomErrors[parentIndex].beds ? 'form-control showError' : 'form-control'}
                                          />
                                        </div>
                                      </Grid>

                                    </Grid>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        paddingTop: "20px",
                                      }}
                                    >
                                      No of guests<span style={{ color: 'red', fontSize: 17 }}>*</span>
                                    </p>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <div>
                                          {/* <label for="email">Adult</label> */}
                                          <input
                                            type="number"
                                            placeholder="No of guests"
                                            class="form-control"
                                            name="guests"
                                            value={n.guests}
                                            onChange={(e) => onChangeRoomDetails(e, n.guests, parentIndex)}
                                            className={roomErrors[parentIndex].guests ? 'form-control showError' : 'form-control'}
                                          />
                                        </div>
                                      </Grid>

                                    </Grid>
                                  </div>
                                  <div style={{ margin: "20px 0px 20px 0px", width: "50%" }}>
                                    <label for="email" style={{ fontSize: 13 }}>
                                      Cancellation Policy:
                                    </label>
                                    <textarea name="cancellationPolicy" value={n.cancellationPolicy}
                                      onChange={(e) => onChangeRoomDetails(e, n.cancellationPolicy, parentIndex)} className={'form-control'} rows="5" id="comment"></textarea>
                                  </div>
                                </div>

                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        );
                      }) : ''}

                    </Grid>
                  )}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep !== 0 && (
                    <Button
                      variant="outlined"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderColor: "#f5f5f5",
                        padding: 15,
                        width: 100,
                        color: "gray",
                        fontSize: 12,
                      }}
                    >
                      Back
                    </Button>
                  )}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )} */}



                  {activeStep === steps.length - 1 ?
                    <Button
                      onClick={() => onSubmit()}
                      variant="contained"
                      style={{
                        backgroundColor: "#1d806e",
                        borderColor: "#1d806e",
                        padding: 15,
                        width: 100,
                        fontSize: 12,
                      }}
                    >
                      Finish
                    </Button>


                    :
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      style={{
                        backgroundColor: "#1d806e",
                        borderColor: "#1d806e",
                        padding: 15,
                        width: 100,
                        fontSize: 12,
                      }}
                    >
                      Next
                    </Button>
                  }


                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </div>
    </div>
  );
}

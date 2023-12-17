import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Sidebar from './sidebar';
import Header from '../../header';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageUploading from "react-images-uploading";
import addImageButton from "../../../images/add-image-button.png";
import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import Loader from '../../../Utils/loader';


const useStyles = makeStyles({
  // root: {
  //   marginTop: 80,
  // },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  showError: {
    border: "red !important"
  },
  hideError: {
    border: "transparent"
  }
});


export default function Roomdetails() {
  const classes = useStyles();
  let { roomId } = useParams();
  const navigate = useNavigate();
  const [age, setAge] = React.useState('');
  const [roomCategories, setRoomCategories] = useState([]);
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    roomCategoryId: '',
    beds: '',
    guests: '',
    regularPrice: '',
    specialPrice: 0,
    cancellationPolicy: '',
    numberOfRoomsCategory: '',
    facilityJoins: [],
    roomfacilityJson: []
  });
  const [images, setImages] = useState([]);
  const [roomsError, setRoomsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (imageList, addUpdateIndex) => {
    const formData = new FormData();
    formData.append("File", imageList[addUpdateIndex].file, imageList[addUpdateIndex].file.name);
    formData.append("RoomId", roomDetails.roomId)
    formData.append("ImageName", imageList[addUpdateIndex].file.name);
    setIsLoading(true)
    axios.post(CONFIG.API_URL + 'RoomImages/UploadRoomImage', formData).then(res => {
      setIsLoading(false)
      if (res.status === 200) {
        getRoomImages()
      }
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);

      });
  };
  const onImageRemove = (index, imageDet, imageList) => {
    setIsLoading(true)
    axios.delete(CONFIG.API_URL + `RoomImages/DeleteRoomImage?id=${imageDet.id}`).then(res => {
      setIsLoading(false)
      if (res.status === 200) {
        getRoomImages()
      }
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);

      });
  }
  const onChangeRoomDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRoomDetails({
      ...roomDetails, [name]: name === "roomCategoryId" ? parseInt(value) : value
    })
    let errors = {};
    if (name === "roomCategoryId" && value == 0) {
      errors[name] = true;
      setRoomsError({ ...roomsError, [name]: true })
    } else if (value == "") {
      errors[name] = true;
      setRoomsError({ ...roomsError, [name]: true })
    } else {
      errors[name] = false;
      setRoomsError({ ...roomsError, [name]: false })
    }
    console.log(roomDetails)
  };
  const getRoomCategories = async () => {
    await axios.get(CONFIG.API_URL + 'RoomCategories/all')
      .then(res => {
        setRoomCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getRoomDetails = () => {
    setIsLoading(true)
    axios.get(CONFIG.API_URL + `Rooms/${roomId}`)
      .then(res => {
        const data = res.data;
        getRoomFacilities(data);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  const getRoomImages = () => {
    setIsLoading(true)
    axios.get(CONFIG.API_URL + `RoomImages/GetRoomImage?RoomId=${roomId}`)
      .then(res => {
        setIsLoading(false)
        setImages(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  const getRoomFacilities = (roomData) => {
    axios.get(CONFIG.API_URL + 'RoomFacility/all')
      .then(res => {
        roomData.facilityJoins.map((faciData, faciIndex) => {
          res.data.map((item, index) => {
            if (faciData.roomFacilityId == item.roomFacilityId) {
              item.isChecked = true;
              item.name = item.name
            }
            return item
          })
        })
        // console.log(res.data)
        setRoomFacilities(res.data);
        setRoomDetails(roomData);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const onFacilityChange = (e, roomindex, val, roomFacilityId) => {
    const { name, value } = e.target;

    const roomDetailsObj = { ...roomDetails };
    let facilityJoins = roomDetailsObj.facilityJoins
    const roomFacilitiesList = [...roomFacilities]
    roomFacilitiesList[roomindex].isChecked = val !== undefined ? val : value;
    if (val == true) {
      roomDetailsObj.facilityJoins.push({
        "roomFacilityId": parseInt(roomFacilityId),
        "roomId": 0
      })
    } else {
      facilityJoins = roomDetailsObj.facilityJoins.filter((faciData) => {
        return faciData.roomFacilityId !== roomFacilityId
      })
      roomDetailsObj.facilityJoins = facilityJoins;
    }
    setRoomDetails(roomDetailsObj);
  };
  const onSubmit = () => {
    if (validate(roomDetails)) {
      let saveDetails = { ...roomDetails }
      saveDetails.createdBy = localStorage.getItem('userId');
      console.log(saveDetails)
      if (roomId !== "create") {
      axios.put(CONFIG.API_URL + 'Rooms', saveDetails).then(res => {
        setIsLoading(false)
        if (res.status === 200) {
          alert('Updated successfully');
          navigate('/mainscreen/room');

        }
      })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
          // setError(err.response.data.error)
        });
      }else{
        axios.post(CONFIG.API_URL + 'Rooms', saveDetails).then(res => {
          setIsLoading(false)
          if (res.status === 200) {
            alert('Saved successfully');
            navigate('/mainscreen/room');
  
          }
        })
          .catch((err) => {
            setIsLoading(false)
            console.log(err);
            // setError(err.response.data.error)
          });
      }
    }
    else{
      if(!roomDetails.specialPrice || roomDetails.specialPrice > 100 || roomDetails.specialPrice<0){
        alert('Discount price must be in percentage from 0 to 100');
      }
    }
  }
  const validate = () => {
    let errors = {};
    if (!roomDetails.name) {
      errors.name = true;
    }
    if (!roomDetails.roomCategoryId) {
      errors.roomCategoryId = true;
    }
    if (!roomDetails.regularPrice) {
      errors.guests = true;
    }
    if (!roomDetails.numberOfRoomsCategory) {
      errors.noofroomcat = true;
    }

    if (!roomDetails.specialPrice || roomDetails.specialPrice > 100 || roomDetails.specialPrice<0) {
      errors.specialPrice = true;
    }

    setRoomsError(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (roomId !== "create") {
      getRoomDetails();
      getRoomImages();
    }
    getRoomCategories();
  }, [])
  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm={9} md={9}>
            <div>
              <Link to="/mainscreen/room" style={{ textDecoration: "none" }}>
                <Button style={{ fontSize: "12px", backgroundColor: "#eceef5", borderRadius: "10px", border: "none", color: "black" }} variant="outlined" startIcon={<ArrowBackIosIcon style={{ fontSize: "12px" }} />}>
                  Back
                </Button>
              </Link>
              <p style={{ fontSize: "14px", fontWeight: "bold", padding: "20px 0px", color: "rgb(0, 145, 130)" }}>Room Details</p>
            </div>
            <Grid container direction="row" spacing={2}>
              <Grid item sm={6} md={6} >
                <TextField label="Room No" required fullWidth id="outlined" name="name" value={roomDetails.name ?? ""} error={roomsError.name} onChange={(e) => onChangeRoomDetails(e)} />

                <FormControl fullWidth style={{ marginTop: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="roomCategoryId"
                    value={roomDetails.roomCategoryId ?? ""}
                    label="Category"
                    error={roomsError.roomCategoryId}
                    onChange={(e) => onChangeRoomDetails(e)}
                  >
                    <MenuItem value="0">--Select Room Category--</MenuItem>
                    {roomCategories ? roomCategories.map(n => {
                      return (
                        <MenuItem key={n.roomCategoryId}
                          value={n.roomCategoryId}>
                          {n.name}
                        </MenuItem>
                      );
                    }) : ''}

                  </Select>
                </FormControl>
                <TextField style={{ marginTop: "20px" }} label="No of room in this Category" required fullWidth id="outlined" name="numberOfRoomsCategory" value={roomDetails.numberOfRoomsCategory ?? ""}
                  onChange={(e) => onChangeRoomDetails(e)} error={roomsError.noofroomcat} />


                <div style={{ marginTop: "20px" }}>
                  <label for="email" style={{ fontSize: 13 }}>
                    Cancellation Policy:<span style={{ color: 'red', fontSize: 17 }}></span>
                  </label><br />
                  <textarea name="cancellationPolicy"
                    value={roomDetails.cancellationPolicy ?? ""}
                    onChange={(e) => onChangeRoomDetails(e)} rows="5" id="comment" style={{ width: "100%" }}></textarea>
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <TextField required label="Regular Price" fullWidth name="regularPrice" value={roomDetails.regularPrice ?? ""} error={roomsError.regularPrice} onChange={(e) => onChangeRoomDetails(e)} type="number"
                    InputLabelProps={{
                      shrink: true,
                    }} />
                  <TextField style={{ marginLeft: "5px" }} label="Discount Percentage" fullWidth name="specialPrice" value={roomDetails.specialPrice ?? ""} error={roomsError.specialPrice} onChange={(e) => onChangeRoomDetails(e)} type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}/>

                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <TextField label="No of Guests" fullWidth name="guests" value={roomDetails.guests ?? ""} onChange={(e) => onChangeRoomDetails(e)} type="number"
                    InputLabelProps={{
                      shrink: true,
                    }} />
                  <TextField style={{ marginLeft: "5px" }} label="No of Beds" fullWidth name="beds" value={roomDetails.beds ?? ""} onChange={(e) => onChangeRoomDetails(e)} type="number"
                    InputLabelProps={{
                      shrink: true,
                    }} />

                </div>

              </Grid>
             {roomId!=='create' && <Grid item sm={6} md={6} >
                <Typography style={{ color: "rgb(0, 145, 130)" }}>Images</Typography>
                <Grid style={{ display: "flex" }} direction={"row"}>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={15}
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
                        <Grid style={{ display: "flex" }}>
                          <Grid style={{ display: "flex" }} container direction="row">
                            <Grid style={{ display: "flex" }} direction={"row"}>
                              {imageList.map((image, index) => (
                                <div>
                                  {index <= 3 && (
                                    <Grid
                                      key={index}
                                      style={{ marginRight: 20 }}
                                    >
                                      <img
                                        src={image.data_url || image.imagePath}
                                        width={100}
                                        height={100}
                                        style={{ borderRadius: 5 }}
                                      />
                                      <div>
                                        <button
                                          onClick={() => onImageRemove(index, image, imageList)}
                                          style={{
                                            position: "absolute",
                                            marginTop: -105,
                                            marginLeft: 85,
                                            borderRadius: 99,
                                            backgroundColor: "black",
                                            paddingLeft: 7,
                                            paddingRight: 7,
                                            color: "white",
                                          }}
                                        >
                                          x
                                        </button>
                                      </div>
                                    </Grid>
                                  )}
                                </div>
                              ))}
                              {imageList.length < 4 && (
                                <Grid>
                                  <button
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    style={{
                                      borderColor: "transparent",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <img
                                      src={addImageButton}
                                      width={100}
                                      height={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </button>
                                </Grid>
                              )}
                            </Grid>

                            <Grid direction={"row"} style={{ display: "flex" }} mt={5}>
                              {imageList.map((image, index) => (
                                <div>
                                  {index <= 6 && index > 3 && (
                                    <Grid
                                      key={index}
                                      style={{ marginRight: 20 }}
                                    >
                                      <img
                                        src={image.data_url || image.imagePath}
                                        width={100}
                                        height={100}
                                        style={{ borderRadius: 5 }}
                                      />
                                      <div>
                                        <button
                                          onClick={() => onImageRemove(index, image)}
                                          style={{
                                            position: "absolute",
                                            marginTop: -105,
                                            marginLeft: 85,
                                            borderRadius: 99,
                                            backgroundColor: "black",
                                            paddingLeft: 7,
                                            paddingRight: 7,
                                            color: "white",
                                          }}
                                        >
                                          x
                                        </button>
                                      </div>
                                    </Grid>
                                  )}
                                </div>
                              ))}
                              {imageList.length >= 4 && imageList.length < 7 && (
                                <Grid>
                                  <button
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    style={{
                                      borderColor: "transparent",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <img
                                      src={addImageButton}
                                      width={100}
                                      height={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </button>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </ImageUploading>
                </Grid>
              </Grid>}
              <Grid>
                <div style={{ display: "flex", margin: "20px", flexWrap: "wrap" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      paddingTop: "20px",
                      color: "rgb(0, 145, 130)"
                    }}
                  >
                    Room Facilities
                  </p>
                  <Grid container spacing={2}>
                    {roomFacilities ? roomFacilities.map((k, index) => {
                      return (
                        <Grid item xs={3} id={k.roomFacilityId} key={index}>
                          <FormControlLabel id={k.roomFacilityId}
                            control={
                              <Checkbox id={k.roomFacilityId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} name="roomfacilityJson" value={k.roomFacilityId} checked={roomFacilities[index].isChecked}
                                onChange={(e) => onFacilityChange(e, index, e.target.checked, k.roomFacilityId)} />
                            }
                            label={k.name == null ? '' : k.name}
                          />
                        </Grid>
                      );
                      // roomDetails.facilityJoins.map((roomFaci, roomindex) => {

                      // })

                    }) : ''}
                  </Grid>


                </div>
              </Grid>
            </Grid>
            <Button style={{ backgroundColor: "#009182", margin: "20px 20px 20px 0px", fontSize: "12px", textTransform: "capitalize" }} variant="contained" onClick={() => onSubmit()}>Save Changes</Button>

          </Grid>

        </Grid>
      </div>
    </div>
  )
}

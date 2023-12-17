import React, { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { Avatar, Grid, Typography, Button } from "@mui/material";
import ImageUploading from "react-images-uploading";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import Loader from '../../../Utils/loader';
import MaxWidthDialog from '../../../Utils/dialog';
import "../../propertyForm.css";
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
  },
  inputtypes: {
    width: "99%", height: "40px", border: "1px solid lightgrey", borderRadius: "8px"
  },
  inputtypesaddres: {
    width: "99%", border: "1px solid lightgrey", borderRadius: "8px"
  }
});

export default function Dashboardscreen() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyType, setPropertyType] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [propFormerrors, setPropFormErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [propDetails, setPropDetails] = useState({
    name: '',
    propertierName: '',
    propertyTypeId: '',
    address: '',
    cityId: '',
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
    tax: '',
    lat : "",
    lng : ""
  });
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    const formData = new FormData();
    formData.append("File", imageList[addUpdateIndex].file, imageList[addUpdateIndex].file.name);
    formData.append("PropertyId", propDetails.propertyID);
    formData.append("Id", 0);
    formData.append("ImageName", imageList[addUpdateIndex].file.name);
    setIsLoading(true)
    axios.put(CONFIG.API_URL + 'PropertyImages/UpdatePropertyImage', formData).then(res => {
      setIsImageUpload(true)
      if (res.status === 200) {
        setImages(imageList);
      }
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);

      });


  };
  const onImageRemove = (index, imageDet, imageList) => {
    setIsImageUpload(false);
    setImages([]);
  }
  const getPropDetails = () => {
    setIsLoading(true)
    axios.get(CONFIG.API_URL + `Property/${localStorage.getItem('userId')}`)
      .then(res => {

        const data = res.data;
        if (res.data != undefined && res.data != null && res.data != "") {
          if (data.imagePath != null && data.imagePath != undefined) {
            setIsImageUpload(true)
          } else {
            setIsImageUpload(false)
          }
          const imagelist = [{ imagePath: data.imagePath, imageName: data.imageName }];
          getAminities(data);
          setImages(imagelist)
          setIsLoading(false)
        }

      })
      .catch((err) => {
        setIsLoading(false)
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
  const getAminities = async (propData) => {

    await axios.get(CONFIG.API_URL + 'Amenities/all')
      .then(res => {
        propData.amenitiesJoins.map((ameniData, ameniIndex) => {
          res.data.map((item, index) => {
            if (ameniData.amenitiesId == item.amenitiesId) {
              item.isChecked = true;
              item.name = item.name;
              item.amenitiesId = item.amenitiesId
            }
            return item
          })
        })
        setPropDetails(propData);
        setAmenities(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
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
  const onChangePropDetails = (e) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    if (name === 'tax') {
      if (isNaN(value) || value === '') {
        setPropDetails({
          ...propDetails, [name]: ""

        })
      } else {
        setPropDetails({
          ...propDetails, [name]: parseInt(value)
        })
      }
    } else {
      setPropDetails({
        ...propDetails, [name]: name === "propertyTypeId" || name === "postalCode" || name === "phoneNumber" || name === "cityId" ? value === "" ? null : parseInt(value) : value
      })
    }

    let errors = {};
    if ((name === "propertyTypeId" || name === "postalCode" || name === "phoneNumber" || name === "cityId") && value == 0) {
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
  const onAminitiesChange = (e, amenitiesId, isChecke, amenindex) => {
    const { value } = e.target;
    const propDetailsObj = { ...propDetails };
    let amenitiesJoins = propDetailsObj.amenitiesJoins
    const amenitiesList = [...amenities]
    amenitiesList[amenindex].isChecked = isChecke !== undefined ? isChecke : value;
    if (isChecke == true) {
      propDetailsObj.amenitiesJoins.push({
        "amenitiesId": parseInt(amenitiesId),
        "propertyID": propDetailsObj.propertyID,
        "name": amenitiesList[amenindex].name,
      })
    } else {
      amenitiesJoins = propDetailsObj.amenitiesJoins.filter((amiData) => {
        return amiData.amenitiesId !== amenitiesId
      })
      propDetailsObj.amenitiesJoins = amenitiesJoins;
    }
    setPropDetails(propDetailsObj);

  }
  const validate = () => {
    let errors = {};
    if (!propDetails.name) {
      errors.name = true;
    }
    if (!propDetails.propertierName) {
      errors.propertierName = true;
    }
    if (!propDetails.propertyTypeId) {
      errors.propertyTypeId = true;
    }
    if (!propDetails.address) {
      errors.address = true;
    }
    if (!propDetails.cityId) {
      errors.cityId = true;
    }
    if (!propDetails.postalCode) {
      errors.postalCode = true;
    }
    if (!propDetails.phoneNumber) {
      errors.phoneNumber = true;
    }
    if (!propDetails.email) {
      errors.email = true;
    }
    if (propDetails.tax<0) {
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
    if (validate(propDetails)) {
      if (images.length != 0) {
        setIsImageUpload(true)
        setIsLoading(true);
        delete propDetails.rooms;
        axios.put(CONFIG.API_URL + 'Property', propDetails).then(res => {
          if (res.status === 200) {
            setIsLoading(false);
            setIsDialogOpen(!isDialogOpen);
            // navigate('/mainscreen/room');           
          }
        })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
            // setError(err.response.data.error)
          });
      } else {
        setIsImageUpload(false)
      }

    }

  };
  useEffect(() => {
    getPropDetails();
    getPropertyType();
    getCities();

  }, [])
  return (
    <div>
      <MaxWidthDialog
        isDialogOpened={isDialogOpen}
        handleCloseDialog={() => setIsDialogOpen(false)}
        title="Information"
        message=" Data Updated Suceessfully"
      />
      <p style={{ color: "rgb(0, 145, 130)", fontSize: "18px", fontWeight: "bold" }}>Hotel Information </p>
      <h5 style={{ color: 'red' }}><span style={{ fontSize: 20 }}></span>* fields are mandatory. </h5>
      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="name" style={{ fontSize: 13, color: "grey" }}>
            Name of the property<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <input type="text" name="name" value={propDetails.name ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.name ? `showError ${classes.inputtypes}` : classes.inputtypes} />
        </div>

        <div style={{ width: "100%", marginLeft: "20px" }}>
          <label for="propertierName" style={{ fontSize: 13, color: "grey" }}>
            Propertier Name<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <input type="text" value={propDetails.propertierName ?? ""}
            onChange={(e) => onChangePropDetails(e)} name="propertierName" className={propFormerrors.propertierName ? `showError ${classes.inputtypes}` : classes.inputtypes} />
        </div>
      </div>

      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="email" style={{ fontSize: 13, color: "grey" }}>
            Email id<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <input type="text" name="email" value={propDetails.email ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.email ? `showError ${classes.inputtypes}` : classes.inputtypes} />
        </div>

        <div style={{ width: "100%", marginLeft: "20px" }}>
          <label for="phoneNumber" style={{ fontSize: 13, color: "grey" }}>
            Phone Number<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <input type="number" name="phoneNumber" value={propDetails.phoneNumber ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.phoneNumber ? `showError ${classes.inputtypes}` : classes.inputtypes} />
        </div>
      </div>
      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="town" style={{ fontSize: 13, color: "grey" }}>
            Town/City<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <select name="cityId" id="sel1" value={propDetails.cityId ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.cityId ? `showError ${classes.inputtypes}` : classes.inputtypes} >
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
          <label for="postalCode" style={{ fontSize: 13, color: "grey" }}>
            Postal Code<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <input type="number" name="postalCode" value={propDetails.postalCode ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.postalCode ? `showError ${classes.inputtypes}` : classes.inputtypes} />
        </div>
      </div>
      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="propertyType" style={{ fontSize: 13, color: "grey" }}>
            Property Type<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label>
          <br />
          <select name="propertyTypeId" id="sel1" value={propDetails.propertyTypeId ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.propertyTypeId ? `showError ${classes.inputtypes}` : classes.inputtypes} >
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
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <label for="address" style={{ fontSize: 13, color: "grey" }}>
            Address<span style={{ color: '#f2735a', fontSize: 17 }}>*</span>
          </label><br />
          <textarea name="address" rows="5" id="comment" value={propDetails.address ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={propFormerrors.address ? `showError ${classes.inputtypesaddres}` : classes.inputtypesaddres}></textarea>
        </div>
      </div>

      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="latitude" style={{ fontSize: 13 }}>
            Latitude:
          </label>
          <input type="text" name="lat" value={propDetails.lat ?? ""} onChange={(e) => onChangePropDetails(e)} 
          className={classes.inputtypes} />
        </div>

        <div style={{ width: "100%", marginLeft: "20px" }}>
          <label for="longitude" style={{ fontSize: 13 }}>
            Longitude:
          </label>
          <input type="text" name="lng" value={propDetails.lng ?? ""} onChange={(e) => onChangePropDetails(e)} 
          className={classes.inputtypes} />
        </div>
      </div>

      <div style={{ margin: "20px 0px 20px 0px", display: "flex" }}>
        <div style={{ width: "100%", marginRight: "20px" }}>
          <label for="checkInOut" style={{ fontSize: 13 }}>
            Check In - Check Out Timings:
          </label>
          <input type="text" name="checkInOut" value={propDetails.checkInOut ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={classes.inputtypes} />
        </div>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <label for="frontDeskTime" style={{ fontSize: 13 }}>
            Front Desk Timings:
          </label>
          <input type="text" name="frontDeskTime" value={propDetails.frontDeskTime ?? ""}
            onChange={(e) => onChangePropDetails(e)} className={classes.inputtypes} />
        </div>
      </div>

      <div style={{ margin: "20px 0px 20px 0px" }}>
        <label for="propertyDesc" style={{ fontSize: 13 }}>
          About Property:
        </label>
        <textarea name="propertyDesc" value={propDetails.propertyDesc ?? ""}
          onChange={(e) => onChangePropDetails(e)} className={classes.inputtypesaddres} rows="8" id="comment"></textarea>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "20px 0px 20px 0px", width: "50%", }}>
          <label for="accountDet" style={{ fontSize: 13 }}>
            Account Details:
          </label>
          <input type="text" name="accountNumber" value={propDetails.accountNumber ?? ""}
            onChange={(e) => onChangePropDetails(e)} placeholder="Account Holder Name" className={classes.inputtypes} /><br />
          <input type="number" name="accountName" value={propDetails.accountName ?? ""}
            onChange={(e) => onChangePropDetails(e)} placeholder="Account Number" className={classes.inputtypes} style={{ marginTop: "10px" }} /><br />
          <input type="text" name="ifscCode" value={propDetails.ifscCode ?? ""}
            onChange={(e) => onChangePropDetails(e)} placeholder="IFSC Code" className={classes.inputtypes} style={{ marginTop: "10px" }} /><br /><br />
          <label style={{ fontSize: 13 }}>
            Gst:
          </label>
          <input type="text" name="tax" value={propDetails.tax ?? ""}
            onChange={(e) => onChangePropDetails(e)} placeholder="Tax"
            className={propFormerrors.tax ? `showError ${classes.inputtypes}` : classes.inputtypes}
            style={{ marginTop: "10px" }} />
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
                        src={image.data_url || image.imagePath}
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
                        src={require("../../../images/add-image-button.png")}
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
      <Grid>
        <p
          style={{ fontWeight: "bold", fontSize: "15px", paddingTop: "10px" }}
        >
          Hotel aminities
        </p>
        <Grid container spacing={2}>
          {amenities ? amenities.map((n, index) => {
            return (
              <Grid item xs={3} key={n.id}>
                <FormControlLabel
                  control={
                    <Checkbox id={n.amenitiesId} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} value={n.amenitiesId} checked={amenities[index].isChecked} onChange={(e) => { onAminitiesChange(e, n.amenitiesId, e.target.checked, index) }} />
                  }
                  label={n.name == null ? '' : n.name}
                />
              </Grid>
            );
          }) : ''}
        </Grid>



      </Grid>
      <Grid container alignItems="right" justifyContent="right">
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          style={{
            backgroundColor: "#1d806e",
            borderColor: "#1d806e",
            padding: 15,
            margin: "-50px 30px 20px 0px",
            fontSize: 12,
          }}
        >
          Save Changes
        </Button>
      </Grid>
    </div>
  )
}

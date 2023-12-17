import React, { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import axios from 'axios';
import profile from "../../images/profile.png";
import { CONFIG } from "../../Utils/config";
import Header from '../header';
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

export default function Account() {
  const classes = useStyles();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [showUploadButton, setShowUploadButton] = React.useState(true);

  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();


  const userDetails = async () => {
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

  const cancel = () => {
    navigate('/profile');
  }

  const onTextChange = (e) => {

    console.log(userData);
    switch (e.target.name) {
      case 'email':

      // let emailV = validateEmail(e.target.value);
      // if (emailV === false) {
      //   setEmailFlag(true);
      //   console.log(emailFlag)
      //   setEmail(e.target.value);
      // } else {
      //   setEmailFlag(false)
      //   setEmail(e.target.value);
      // }
      // break;
      case 'firstName':
        setUserData(
          {
            ...userData, firstName: e.target.value
          }
        )
        console.log(userData)
        //  setFirstName(e.target.value)
        break;
      case 'lastName':
        // setLastName(e.target.value)
        setUserData(
          {
            ...userData, lastName: e.target.value
          }
        )
        break;
      case 'phoneNumber':
        setUserData(
          {
            ...userData, phoneNumber: e.target.value
          })
        // let format = checkPassword(e.target.value);
        // if(format === false)
        // {
        //   setPasswordFormat(true);
        //   setPassword(e.target.value);
        // }
        // else{
        //   setPasswordFormat(false);
        //   setPassword(e.target.value);
        // }


        break;
      case 'address':
        setUserData(
          {
            ...userData, address: e.target.value
          })
        // 
        // if (password !== e.target.value) {
        //   setConfirmPassword(e.target.value)
        //   setCPasswordFlag(true);
        // }
        // else {
        //   setConfirmPassword(e.target.value)
        //   setCPasswordFlag(false);
        // }

        break;
      default:
        break;
    }
  }




  const processHandler = () => {

    
    const formData = new FormData();
    formData.append('File', images[0].file, images[0].file.name);
    formData.append('FileName', images[0].file.name);
    formData.append('UserId', userId);

    const request = new XMLHttpRequest();


    request.open('POST', CONFIG.API_URL + 'Account/UploadProfileImage');

    request.upload.onprogress = (e) => {
      // progress(e.lengthComputable, e.loaded, e.total);
    };

    request.onload = (e) => {
      if (request.status == 200) {
        
        let data = JSON.parse(request.response);
        console.log(userData);
        updateUserDetails();
        //  load("success");
        //  this.props.parentMethod();
        //this.setState({ showUpload: false });
      }
      else {

        //   error('oh no');
      }
    };

    //  request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send(formData);
    //Should expose an abort method so the request can be cancelled
    return {
      // abort: () => {
      //   // This function is entered if the user has tapped the cancel button
      //   request.abort();

      //   // Let FilePond know the request has been cancelled
      //   abort();
      // }
    };
  }

  const updateUserDetails = () => {
    let data = {

      "firstName": userData?.firstName,
      "lastName": userData?.lastName,
      "phoneNumber": userData?.phoneNumber,
      "address": userData?.address,
      "userId": userId
    }

    axios.request({
      url: CONFIG.API_URL + 'Account/UpdateProfile', data,
      method: 'put',
    })
      .then(res => {
        alert('updated')
        userDetails();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const updateDetails = () => {
    

    if (images.length === 0) {
      updateUserDetails();
    }
    else {
      processHandler();
    }


    // const data = {
    //   "FileName": images[0].file.name,
    //   "File": images[0].file,
    //   "UserId": userId
    // }
    // axios.post(CONFIG.API_URL + 'Account/UploadProfileImage', data).then(res => {
    //   if (res.status === 200) {
    //     console.log(res.data);
    //     // setRequiredFlag(false)
    //     // let navigate = useNavigate();
    //     //  navigate('./login', { replace: true })

    //     if (res.data.userId !== "") {
    //       // localStorage.setItem('UserId', res.data.userId);
    //       alert("Account created successfully.")
    //       navigate('/login');
    //     }
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //     // setError(err.response.data.error)
    //   });


  }


  // const onChange = (imageList, addUpdateIndex) => {
  //   

  //   setImages(imageList);
  //   if (images) {
  //     setShowUploadButton(false);
  //     setFile(imageList);

  //     setFileName(
  //       {
  //         ...fileName, fileName:"Sugumar"
  //       })
  //     console.log(file);
  //     console.log(fileName);

  //   } else {
  //     setShowUploadButton(true);
  //   }
  // };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setImages(imageList);
    if (images) {
      setShowUploadButton(false);
    } else {
      setShowUploadButton(true);
    }

  };
  return (
    <div className={classes.root}>
        <Header/>
      <div className={classes.gridspace}>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              display: "flex",
              color: "black",
            }}
          >
            <span style={{ fontWeight: "bold", paddingTop: "2px" }}>
              <ArrowBackIosIcon />
            </span>
            Account details
          </p>
        </Link>
        <Grid container spacing={4} style={{ marginTop: "15px" }}>
          <Grid item xs={8}>
         
            <div style={{  margin: "0px 20px 20px 10px" }}>
            <label  style={{ fontSize: 10 ,color:"grey"}}>
                          First Name
                        </label>
              <TextField
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
                required
                name='firstName'
                onChange={(e) => onTextChange(e)}
                //label="First Name"
                //defaultValue="Sanjith"
                value={userData?.firstName}
                variant="standard"
                style={{ width: "100%" }}
              />
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
            <div style={{ margin: "20px 20px 20px 10px" }}>
            <label  style={{ fontSize: 10 ,color:"grey"}}>
                        Last Name
                        </label>
              <TextField
                required
                // label="Last Name"
                value={userData?.lastName}
                variant="standard"
                style={{ width: "100%" }}
                name="lastName"
                onChange={(e) => onTextChange(e)}
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
            <div style={{  margin: "20px 20px 20px 10px" }}>
            <label  style={{ fontSize: 10 ,color:"grey"}}>
                          Email
                        </label>
              <TextField
                required
                // label="Email address"
                // defaultValue="sanjith@gmail.com"
                variant="standard"
                style={{ width: "100%" }}
                value={userData?.email}
                disabled={true}
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
            {/* <div style={{  margin: "20px 20px 20px 10px" }}>
              <TextField
                required
                type="password"
                disabled={true}
                defaultValue="sanjith@gmail.com"
                variant="standard"
                style={{ width: "100%" }}
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
            </div> */}
            <div style={{margin: "20px 20px 20px 10px" }}>
            <label  style={{ fontSize: 10 ,color:"grey"}}>
                          Phone Number
                        </label>
              <TextField
                required
                // label="Phone Number"
                type="number"
                //defaultValue="9857356727"
                //disabled={true}
                name="phoneNumber"
                value={userData?.phoneNumber === null ? '' : userData?.phoneNumber}
                variant="standard"
                style={{ width: "100%" }}
                onChange={(e) => onTextChange(e)}
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
            <div style={{ margin: "20px 20px 20px 10px" }}>
            <label  style={{ fontSize: 10 ,color:"grey"}}>
                          Address
                        </label>
              <TextField
                required
                //label="Address"
                // defaultValue="ooty Nilgiris"
                //disabled={true}
                value={userData?.address === null ? '' : userData?.address}
                name="address"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(e) => onTextChange(e)}
                inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ marginTop: "60px" }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#009182",
                  color: "white",
                  marginLeft: "10px",
                  fontSize: 12,
                  padding: 15,
                }}
                onClick={() => updateDetails()}
              >
                Update changes
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#908e8e",
                  marginRight: "30px",
                  fontSize: 12,
                  padding: 15,
                  paddingLeft: 40,
                  paddingRight: 40,
                }}
                onClick={() => cancel()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={14} fontWeight={"bold"}>
              Profile Picture
            </Typography>
            <div>

              {/* <img
                src={userData?.imagePath}
                width={250}
                height={200}
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              /> */}

              <ImageUploading
                // multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    {/* {showUploadButton && ( */}
                    <button
                      style={{
                        backgroundColor: "#009182",
                        borderColor: "transparent",
                        color: "white",
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 10,
                      }}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      {userData?.imagePath === null ? "Upload Avatar" : "Update Avatar"}
                    </button>
                    {/* )} */}
                    &nbsp;
                    {/* <button onClick={onImageRemoveAll}>
                      Remove all images
                    </button> */}

                    {images.length === 0 ?


                      <div className="image-item">
                        <img
                          src={userData?.imagePath === null ? profile : userData?.imagePath}
                          width={250}
                          height={200}
                          style={{
                            marginTop: 20,
                            marginBottom: 20,
                            borderRadius: 5,
                          }}
                        />
                        <div className="image-item__btn-wrapper">
                          {/* <button
                            onClick={() => {
                              onImageRemove();
                              setShowUploadButton(true);
                            }}
                            style={{
                              backgroundColor: "#f5f5f5",
                              color: "#908e8e",
                              borderColor: "transparent",
                              borderRadius: 5,
                              fontSize: 12,
                              padding: 15,
                              paddingLeft: 40,
                              paddingRight: 40,
                              fontWeight: 700,
                              width: 250,
                            }}
                          >
                            Remove
                          </button> */}
                        </div>
                      </div>






                      : imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            src={image.data_url}
                            width={250}
                            height={200}
                            style={{
                              marginTop: 20,
                              marginBottom: 20,
                              borderRadius: 5,
                            }}
                          />
                          {/* <div className="image-item__btn-wrapper">
                            <button
                              onClick={() => {
                                onImageRemove(index);
                                setShowUploadButton(true);
                              }}
                              style={{
                                backgroundColor: "#f5f5f5",
                                color: "#908e8e",
                                borderColor: "transparent",
                                borderRadius: 5,
                                fontSize: 12,
                                padding: 15,
                                paddingLeft: 40,
                                paddingRight: 40,
                                fontWeight: 700,
                                width: 250,
                              }}
                            >
                              Remove
                            </button>
                          </div> */}
                        </div>
                      ))}


                  </div>
                )}
              </ImageUploading>            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  Grid,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

import Loader from '../../../Utils/loader';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import * as moment from 'moment';
import { SettingsSuggest } from "@mui/icons-material";
const useStyles = makeStyles({

  tdata: {
    fontSize: "12px!important"
  },
  showError: {
    border: "red !important"
  },
  hideError: {
    border: "transparent"
  }
});


export default function Addnewemployee() {
  const classes = useStyles();
  let { empId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passowordFormat, setPasswordFormat] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);
  const [employeeDetails, setEmployeeDetails] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: "",
    address: "",
    isEmployee: "",
    aadharCardProof: "",
    designation: "",
    dateOfBirth: ""
  })
  const [userName, setUserName] = React.useState();
  const [empErrors, setEmpError] = useState({});
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }


  const checkPassword = (password) => {
    var format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (password.match(format)) {
      return true;
    }
    else {
      return false;
    }
  }
  useEffect(() => {
    if (empId !== "addnewemployee") {
      getEmpDetails()
    }
  }, [])
  const getEmpDetails = () => {
    setIsLoading(true)
    axios.get(CONFIG.API_URL + `User/GetUserByIdAysnc?id=${empId}`)
      .then(res => {
        const data = res.data;
        setEmployeeDetails(data);
        setUserName(data.email)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  const onSubmit = () => {
    if (validate(employeeDetails)) {
      let saveDetails = { ...employeeDetails }
      saveDetails.isEmployee = true;
      saveDetails.userName = saveDetails.email;
      saveDetails.dateOfBirth = moment(employeeDetails.dateOfBirth).format('YYYY-MM-DD');
      setIsLoading(true)
      if (empId !== "addnewemployee") {
        axios.put(CONFIG.API_URL + 'Account/UpdateProfile', saveDetails).then(res => {
          setIsLoading(false)
          if (res.status === 200) {
            alert('Updated successfully');
            navigate('/mainscreenadmin/employees');

          }
        })
          .catch((err) => {
            setIsLoading(false)
            console.log(err);
            // setError(err.response.data.error)
          });
      } else {
        axios.post(CONFIG.API_URL + 'Account/Register', saveDetails).then(res => {
          setIsLoading(false)
          if (res.status === 200) {
            alert('Saved successfully');
            navigate('/mainscreenadmin/employees');

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
  const onTextChangeProperty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'email') {
      let emailV = validateEmail(e.target.value);
      if (emailV === false) {
        setEmailFlag(true);
      } else {
        setEmailFlag(false);
      }
      setEmployeeDetails({
        ...employeeDetails, 'email': value
      })
      setUserName(value)
    } else if (name === 'password') {
      let format = checkPassword(e.target.value);
      if (format === false) {
        setPasswordFormat(true);
      }
      else {
        setPasswordFormat(false);
      }
      setEmployeeDetails({
        ...employeeDetails, [name]: value
      })
    } else {
      setEmployeeDetails({
        ...employeeDetails, [name]: value
      })
    }
    let errors = {};

    if ((name === "phoneNumber") && value == 0) {
      errors[name] = true;
      setEmpError({ ...empErrors, [name]: true })
    } else if (value == "") {
      errors[name] = true;
      setEmpError({ ...empErrors, [name]: true })
    } else {
      errors[name] = false;
      setEmpError({ ...empErrors, [name]: false })
    }
  };

  const validate = () => {
    let errors = {};
    if (!employeeDetails.firstName) {
      errors.firstName = true;
    }
    if (!employeeDetails.lastName) {
      errors.lastName = true;
    }
    if (!employeeDetails.email) {
      errors.email = true;
    } else {
      let emailV = validateEmail(employeeDetails.email);
      if (emailV === false) {
        setEmailFlag(true);
        errors.email = true;
      } else {
        setEmailFlag(false);
      }
    }
    if (empId === 'addnewemployee') {
      if (!employeeDetails.password) {
        errors.password = true;
      } else {
        let format = checkPassword(employeeDetails.password);
        if (format === false) {
          setPasswordFormat(true);
          errors.password = true;
        } else {
          setPasswordFormat(false);
        }
      }
    }

    if (!employeeDetails.phoneNumber) {
      errors.phoneNumber = true;
    }
    if (!employeeDetails.address) {
      errors.address = true;
    }
    if (!employeeDetails.aadharCardProof) {
      errors.aadharCardProof = true;
    }
    if (!employeeDetails.designation) {
      errors.designation = true;
    }
    if (!employeeDetails.dateOfBirth) {
      errors.dateOfBirth = true;
    }
    setEmpError(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <div style={{ display: "flex" }}>
            <Link to="/mainscreenadmin/employees" style={{ textDecoration: "none", color: "#009182" }}>
              <ArrowBackIcon style={{ width: '25px', height: "25px", marginRight: "10px", cursor: "pointer" }} />
            </Link>
            <p
              style={{
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#009182",
              }}
            >
              Employee Details
            </p>
          </div>
        </Grid>
        {/* <Grid>
          <Button
            variant="outlined"
            size="small"
            style={{
              color: "#009182",
              border: "1px solid #009182",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            Add New Employee
          </Button>
        </Grid> */}
      </Grid>


      <Grid container alignItems="center" justifyContent="space-between" spacing={3} >
        <Grid item container justifyContent="center" xs={12}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: "100px", height: "100px" }} /><br />
        </Grid>
        <Grid item xs={6}>
          <TextField style={{ fontSize: "12px" }} fullWidth id="outlined-basic" label="First Name" variant="outlined"
            name="firstName" required value={employeeDetails.firstName} onChange={(e) => onTextChangeProperty(e)} error={empErrors.firstName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined"
            name="lastName" required value={employeeDetails.lastName} onChange={(e) => onTextChangeProperty(e)} error={empErrors.lastName} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Email id" variant="outlined"
            name="email" required value={employeeDetails.email} onChange={(e) => onTextChangeProperty(e)} error={empErrors.email} />
          {emailFlag === true ? <p style={{ color: "red" }}>Please enter valid email.</p> : ''}
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined"
            name="phoneNumber" required value={employeeDetails.phoneNumber} onChange={(e) => onTextChangeProperty(e)} error={empErrors.phoneNumber} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Aadhar Number" variant="outlined"
            name="aadharCardProof"required value={employeeDetails.aadharCardProof} onChange={(e) => onTextChangeProperty(e)} error={empErrors.aadharCardProof} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Designation" variant="outlined"
            name="designation" required value={employeeDetails.designation} onChange={(e) => onTextChangeProperty(e)} error={empErrors.designation} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="User name" variant="outlined" disabled
            name="userName" value={employeeDetails.email} />
        </Grid>
        {empId === 'addnewemployee' && <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Password" variant="outlined"
            name="password" required value={employeeDetails.password} onChange={(e) => onTextChangeProperty(e)} error={empErrors.password} />

          {passowordFormat === true ? <p style={{ color: "red" }}>Must contain at least one number and one uppercase and lowercase letter and at least 7 or more characters.</p> : ''}
        </Grid>}
        <Grid item xs={6}>
          <LocalizationProvider
            style={{ fontSize: "18px" }}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              style={{ fontSize: "18px", width: "100%" }}
              fullWidth
              required
              label="Date of Birth"
              inputFormat="dd/MM/yyyy"
              value={employeeDetails.dateOfBirth}
              onChange={(newValue) => {
                setEmployeeDetails({
                  ...employeeDetails, 'dateOfBirth': newValue
                })

              }}
              error={empErrors.dateOfBirth}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="outlined-basic" label="Address" variant="outlined"
            name="address" required value={employeeDetails.address} onChange={(e) => onTextChangeProperty(e)}
            error={empErrors.address} />
        </Grid>
        <Grid item container justifyContent="flex-end" xs={12}>
          <Button variant="contained" onClick={() => onSubmit()}>Save</Button>
        </Grid>

      </Grid>
    </div>
  )
}

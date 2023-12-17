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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import Loader from '../../../Utils/loader';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  thead: {
    fontSize: "14px!important",
    color: "white!important"
  },
  tdata: {
    fontSize: "12px!important"
  }
});

export default function Employees() {
  const classes = useStyles();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getEmployeeDetails = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `User`)
      .then(res => {
        setIsLoading(false);
        setEmployeeDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }
  const onDelete = (empData) => {
    setIsLoading(true)
    axios.delete(CONFIG.API_URL + `User/${empData.userId}`)
      .then(res => {
        if (res.status === 200) {
          setIsLoading(false)
          alert('Deleted successfully');
          getEmployeeDetails();
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  useEffect(() => {
    getEmployeeDetails()
  }, [])
  return (
    <div>
       {isLoading && <Loader isLoading={isLoading}/>}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <p
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#009182",
            }}
          >
            Employees
          </p>
        </Grid>
        <Grid>
          <Link to="addnewemployee" style={{ textDecoration: "none", color: "#009182" }}>
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
          </Link>
        </Grid>
      </Grid>
      <div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
              <TableRow>
                <TableCell className={classes.thead}>Employee Name</TableCell>
                {/* <TableCell className={classes.thead} align="left">Employee ID</TableCell> */}
                <TableCell className={classes.thead} align="left">Phone Number</TableCell>
                <TableCell className={classes.thead} align="left">Email</TableCell>
                <TableCell className={classes.thead} align="left">Designation</TableCell>
                <TableCell className={classes.thead} align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeDetails.map((row) => (
                <TableRow key={row.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className={classes.tdata}>
                    {row.firstName}
                  </TableCell>
                  {/* <TableCell align="left" className={classes.tdata}>{row.empId}</TableCell> */}
                  <TableCell align="left" className={classes.tdata}>{row.phoneNumber}</TableCell>
                  <TableCell align="left" className={classes.tdata}>{row.email}</TableCell>
                  <TableCell align="left" className={classes.tdata}>{row.designation}</TableCell>
                  <TableCell className={classes.tdata} align="left">
                    <Link to={row.userId.toString()}>
                      <Button style={{ border: "none", color: "rgb(0, 145, 130)" }} variant="outlined" endIcon={<BorderColorTwoToneIcon />}>
                      </Button>
                    </Link>
                    <Button style={{ border: "none", color: "red" }} variant="outlined" endIcon={<DeleteOutlinedIcon />} onClick={() => onDelete(row)}>
                    </Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

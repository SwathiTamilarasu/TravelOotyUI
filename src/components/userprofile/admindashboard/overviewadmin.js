import React, { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { Divider, Grid, Typography, Container, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Loader from '../../../Utils/loader';
const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold"
  }
});

export default function Overviewadmin() {
  const classes = useStyles();
  const [propDetails, setPropDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPropertyDetails = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Property/all`)
      .then(res => {
        setIsLoading(false);
        setPropDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })

  }
  const onApproveDecline = (propData, type) => {
    setIsLoading(true)
    const saveDetails = [{
      "operationType": 0,
      "path": "/ApprovalStatus",
      "op": "Replace",
      "from": "string",
      "value": type
    }]
    const activeDetails = [{
      "operationType": 0,
      "path": "/IsActive",
      "op": "Replace",
      "from": "false",
      "value": type==="Approved" ? true : false
    }]
    axios.patch(CONFIG.API_URL + `Property/${propData.propertyID}`, saveDetails)
      .then(res => {
        axios.patch(CONFIG.API_URL + `Property/${propData.propertyID}`, activeDetails)
          .then(res => {
            setIsLoading(false);
            if (res.status === 200) {
              if (type === "Approved") {
                alert('Approved successfully');
              } else {
                alert('Declined successfully');
              }
              getPropertyDetails();
            }
          }).catch((err) => {
            setIsLoading(false);
            console.log(err);
          })
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }

  useEffect(() => {
    getPropertyDetails()
  }, [])
  return (

    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      {localStorage.getItem('isEmployee') == 'false' && <><p style={{ color: "black", fontSize: "20px", fontWeight: "bold", color: "#009182" }}>Stats</p>
        <Grid container spacing={2}>
          <Grid item md={3} >
            <div style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "10px " }}>
              <p style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>$5600.50</p>
              <p style={{ color: "#3a3335", fontSize: "14px" }}>Turnover</p>
            </div>
          </Grid>
          <Grid item md={3} >
            <div style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "10px " }}>
              <p style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>$5600.50</p>
              <p style={{ color: "#3a3335", fontSize: "14px" }}>Total Bookings</p>
            </div>
          </Grid>
          <Grid item md={3} >
            <div style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "10px " }}>
              <p style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>$5600.50</p>
              <p style={{ color: "#3a3335", fontSize: "14px" }}>New guests</p>
            </div>
          </Grid>
          <Grid item md={3} >
            <div style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "10px " }}>
              <p style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>$5600.50</p>
              <p style={{ color: "#3a3335", fontSize: "14px" }}>Turnover</p>
            </div>
          </Grid>
        </Grid>
      </>}
      <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", margin: "15px 0px", color: "#009182" }}>Requests</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
            <TableRow>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Property Name</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Date</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Type</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="left">Owner details</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold", color: "white" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propDetails.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left" style={{ fontSize: "14px", width: "200px", wordBreak: "break-all" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px", width: "150px", wordBreak: "break-all" }}>{row.name}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px", width: "150px", wordBreak: "break-all" }}>{row.fat}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px", width: "200px", wordBreak: "break-all" }}>{row.propertierName}</TableCell>
                <TableCell align="right" style={{ fontSize: "14px", width: "200px" }}>
                  <Button variant="outlined" size="small" style={{ color: "#009182", border: "1px solid #009182" }} onClick={() => onApproveDecline(row, "Approved")}>Approve</Button>
                  <Button variant="outlined" size="small" style={{ color: "#f05637", border: "1px solid #f05637", marginLeft: "10px" }} onClick={() => onApproveDecline(row, "Declined")}>Decline</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

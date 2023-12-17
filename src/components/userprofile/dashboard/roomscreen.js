import React, { useState, useEffect } from 'react'
import { Typography, Button,Grid } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
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

export default function Roomscreen() {
  const classes = useStyles();
  const [roomDetails, setRoomDetails] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const getRooms = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Rooms/UserId?userId=${localStorage.getItem('userId')}`)
      .then(res => {
        setIsLoading(false)
        setRoomDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })

  }
  const onDelete = (roomData) => {
    setIsLoading(true)
    axios.delete(CONFIG.API_URL + `Rooms/${roomData.roomId}`)
      .then(res => {
        if (res.status === 200) {
          setIsLoading(false)
          alert('Deleted successfully');
          getRooms();
        }      
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }
  useEffect(() => {
    getRooms()
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
            Rooms
          </p>
        </Grid>
        <Grid>
          <Link to="create" style={{ textDecoration: "none", color: "#009182" }}>
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
              Add New Room
            </Button>
          </Link>
        </Grid>
      </Grid>
      {typeof roomDetails !== 'string' ?   <TableContainer component={Paper} >
        <Table aria-label="simple table">
         
          <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
            <TableRow >
              <TableCell style={{ fontSize: "14px", fontWeight: "bold",color:"white" }}>Room Name</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold",color:"white" }} align="left">Category</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold" ,color:"white"}} align="left">Accommodation</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold",color:"white" }} align="left">Price/night</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold" ,color:"white"}} align="left">Status</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold",color:"white" }} align="left">Edit</TableCell>
              <TableCell style={{ fontSize: "14px", fontWeight: "bold",color:"white" }} align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: "auto" }}>
            {roomDetails.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.roomCategoryName}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.fat}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.regularPrice}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>{row.protein}</TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  <Link to={row.roomId.toString()}>
                    <Button style={{ border: "none",color:"rgb(0, 145, 130)" }} variant="outlined" endIcon={<BorderColorTwoToneIcon />}>
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="left" style={{ fontSize: "12px", }}>
                  <Button style={{ border: "none",color:"red" }} variant="outlined" endIcon={<DeleteOutlinedIcon />} onClick={() => onDelete(row)}>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> :<div>{roomDetails}</div>   }
    
    </div>
  )
}

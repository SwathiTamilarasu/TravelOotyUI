import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

const useStyles = makeStyles({
    root: {
      marginTop: 80,
    },
  sidetxt:{
      fontSize:"14px",
      fontWeight:"bold"
  }
  });

export default function Sidebar() {
    const classes = useStyles();
    return (
        <div style={{backgroundColor:"#f7f7f7",height:"100vh"}}>
           <List>
          
          <Link to="/mainscreen/dashboard" style={{textDecoration:"none"}}>
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{fontWeight:"bold",textDecoration:"none",fontSize:"16px"}}>Hotel Information</Typography>
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider style={{backgroundColor:"white",color:"white"}}/>
          <Link to="/mainscreen/room" style={{textDecoration:"none"}}> 
            <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{fontWeight:"bold",fontSize:"16px"}}>Rooms</Typography>
            </ListItemButton>
          </ListItem>
           </Link>
           <Divider/>
           <Link to="/mainscreen/bookings" style={{textDecoration:"none"}}> 
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{fontWeight:"bold",fontSize:"16px"}}>Bookings</Typography>
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider/>
          <Link to="/mainscreen/schedules" style={{textDecoration:"none"}}> 
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{fontWeight:"bold",fontSize:"16px"}}>Schedules</Typography>
            </ListItemButton>
          </ListItem>
          </Link>
          {/* <Divider/>
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{fontWeight:"bold"}}>Pricing</Typography>
            </ListItemButton>
          </ListItem> */}
        </List>
        </div>
    )
}

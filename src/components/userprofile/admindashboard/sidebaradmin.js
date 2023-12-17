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
    marginTop: 50,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  mainnav: {
    "& link .active": {
      color: "#009182",
    }
  }

});

export default function Sidebaradmin() {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#f7f7f7", height: "100vh", }}>
      <List className="mainnav">

        <Link to="/mainscreenadmin/overviewadmin" className={classes.link} style={{ textDecoration: "none", color: "#009182" }} >
          <ListItem enablePadding >
            <ListItemButton>
              <Typography style={{ fontWeight: "bold", textDecoration: "none", fontSize: "16px" }}>Overview</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider style={{ backgroundColor: "white", color: "white" }} />
        <Link to="/mainscreenadmin/room" style={{ textDecoration: "none", color: "#009182" }}>
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Properties</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/mainscreenadmin/booking" style={{ textDecoration: "none", color: "#009182" }}>
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Bookings</Typography>
            </ListItemButton>
          </ListItem>
        </Link>


        <Divider />
       { localStorage.getItem('isEmployee') == 'false' && <Link to="/mainscreenadmin/employees" style={{ textDecoration: "none", color: "#009182" }}>
        <ListItem enablePadding>
          <ListItemButton>
            <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Employees</Typography>
          </ListItemButton>
        </ListItem>
        </Link>}
        <Divider />
        <Link to="/mainscreenadmin/others" style={{ textDecoration: "none", color: "#009182" }}>
          <ListItem enablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Others</Typography>
            </ListItemButton>
          </ListItem>
        </Link>

      </List>
    </div>
  )
}

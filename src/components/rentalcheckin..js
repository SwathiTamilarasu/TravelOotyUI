import React from 'react'
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Paper, TextField, Popover } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendar,
    faChevronDown,
  } from "@fortawesome/free-solid-svg-icons";
  import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const useStyles = makeStyles({
    root: {
        marginTop: 50,
    },
    gridsapce: {

        "@media (max-width: 1100px)": {
            paddingTop: 30,
            marginLeft: 100,
            marginRight: 100,
        },
        "@media (min-width: 1100px)": {
            paddingTop: 30,
            marginLeft: 180,
            marginRight: 180,
        }
    },
    findhotelbtn: {
        marginTop:"10px",
        backgroundColor: "rgb(13, 74, 67)",
        color: "white",
        fontSize: "12px",
        border: "none",
        padding: "12px 20px 12px 20px",
        borderRadius: "5px",
        marginRight: "15px",
    },
    fromdate: {
        borderRight: "none",
        padding: "12px 0px 12px 35px",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        borderTop: "1px solid lightgrey",
        borderLeft: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
      },
      todate: {
        borderLeft: "none",
        padding: "12px 10px 12px 0px",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        borderTop: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
      },
});

export default function Rentalcheckin() {
    const classes = useStyles();
    const [value, setValue] = React.useState([null, null]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

   
   
    
    return (
        <div >
            {/* <Grid className={classes.gridsapce}> */}
                <Grid style={{ marginTop: "15px" }}>
                    <Paper
                        style={{
                            borderRadius: 8,
                            padding:"12px 20px 20px 20px",
                            display: "flex",
                            backgroundColor: "rgb(247, 247, 247)",
                            boxShadow: "none",
                        }}
                    >
                        <Grid md={12} container direction="row"  alignItems="center">
                      
                          
                            
                                <Grid xs={12} md={4}>
                                <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize:"12px"
                                        }}
                                    >
                                        Pickup & Drop
                                 </span>
                                   <div style={{display:"flex"}}>
                                   <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        startText="Check-in"
                                        endText="Check-out"
                                        value={value}
                                        onChange={(newValue) => {
                                        setValue(newValue);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                        )}
                                    />
                                    </LocalizationProvider>
                                    </div>
                                </Grid>
                                
                                <Grid xs={12} md={4} >
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize:"12px"
                                        }}
                                    >
                                       Pickup location
                                 </span>
                                 <Box>
                                    <FormControl style={{width:"150px"}} >
                                       {/* <InputLabel>location</InputLabel> */}
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                       
                                        onChange={handleChange}
                                        >
                                        <MenuItem value={10}>Ooty</MenuItem>
                                        <MenuItem value={20}>Kotagiri</MenuItem>
                                        <MenuItem value={30}>Coonoor</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Box>
                                  
                                </Grid>
                         
                            <Grid xs={12} md={4} container alignItems="flex-end">
                                <button
                                    variant="contained"
                                    size="large"
                                    className={classes.findhotelbtn}
                                    // style={{ position: "relative", float: "right" }}
                                >
                                   Search
                                 </button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            {/* </Grid> */}
        </div>
    )
}

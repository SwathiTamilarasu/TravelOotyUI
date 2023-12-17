import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Paper, TextField, Popover } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendar,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import * as moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';


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
    picker: {
        "@media (max-width: 500px)": {
            width: "100%"
        },
        '& .DateInput_input': {
            fontSize: "14px"
        }
    },
    dates: {
        display: "flex",
        "@media (max-width: 500px)": {
            display: "block",
        },
    },
    picker: {
        "@media (max-width: 500px)": {
            width: "100%",
            marginBottom: "10px"
        },
        '& .DateInput_input': {
            fontSize: "14px"
        }
    },
    guestpick: {

        "@media (max-width: 500px)": {
            width: "100%!important",
        },
    },
    findhotelbtn: {
        marginTop: "10px",
        backgroundColor: "rgb(13, 74, 67)",
        color: "white",
        fontSize: "14px",
        border: "none",
        padding: "12px 60px 12px 60px",
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
        padding: "12px 0px 12px 0px",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        borderTop: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
    },
});

export const HORIZONTAL_ORIENTATION = "horizontal";
export const VERTICAL_ORIENTATION = "vertical";

export default function Checkin({ childToParent }) {
    const classes = useStyles();
    const location = useLocation();
    let localCheckIn;
    let localCheckOut;
    let localDateDiff;
    let localAdults;
    let localChilds;
    let localRooms;
    const [isDateChanged, setIsDateChanged] = React.useState(false);
    const [isSelectValueChanged, setIsSelectValueChanged] = React.useState(false);
    if (location.pathname === '/') {
        localCheckIn = moment();
        localCheckOut = moment().add(1, 'days');
        localDateDiff = 0;
        localAdults = 2;
        localChilds = 0;
        localRooms = 1;
        if (!isDateChanged) {
            localStorage.setItem('checkinDate', localCheckIn);
            localStorage.setItem('checkoutDate', localCheckOut);
            localStorage.setItem('dateDiff', localDateDiff);
        }
        if (!isSelectValueChanged) {
            localStorage.setItem('selectedAdults', localAdults);
            localStorage.setItem('selectedChilds', localChilds);
            localStorage.setItem('selectedRooms', localRooms);
        }

    } else {
        localCheckIn = localStorage.getItem('checkinDate') === null ? moment() : moment(localStorage.getItem('checkinDate'));
        localCheckOut = localStorage.getItem('checkoutDate') === null ? moment().add(1, 'days') : moment(localStorage.getItem('checkoutDate'));
        localDateDiff = localCheckOut.diff(localCheckIn, 'days')
        localAdults = localStorage.getItem('selectedAdults') === null ? localAdults : localStorage.getItem('selectedAdults');
        localChilds = localStorage.getItem('selectedChilds') === null ? localChilds : localStorage.getItem('selectedChilds');
        localRooms = localStorage.getItem('selectedRooms') === null ? localRooms : localStorage.getItem('selectedRooms');
    }
    const [value, setValue] = React.useState([null, null]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [adults, setAdults] = React.useState(localAdults);
    const [children, setChildren] = React.useState(localChilds);
    const [rooms, setRooms] = React.useState(localRooms);
    const [checkInDate, setCheckInDate] = React.useState(localCheckIn);
    const [checkOutDate, setCheckOutDate] = React.useState(localCheckOut);
    const [dateDiff, setDateDiff] = React.useState(localDateDiff);
    const [isCheckInFirst, setIsCheckInFirst] = React.useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const onDateChange = (startDate, endDate) => {
        console.log(startDate, endDate, "hai")
        let dateDiffValue = 0;
        setIsDateChanged(true);
        console.log(focusedInput);
        if (startDate != null) {
            setCheckInDate(startDate);
            localStorage.setItem('checkinDate', startDate);
        }
        if (endDate != null) {
            setCheckOutDate(endDate);
            localStorage.setItem('checkoutDate', endDate);
        }
        if (startDate !== null && endDate !== null) {
            dateDiffValue = 0
            let date1 = moment(startDate);
            let date2 = moment(endDate);
            dateDiffValue = date2.diff(date1, 'days')
            if (focusedInput === 'startDate') {
               setDateDiff(dateDiffValue);
                localStorage.setItem('dateDiff', dateDiffValue);
            } else if (focusedInput === 'endDate') {
                setDateDiff(dateDiffValue + 1);
                localStorage.setItem('dateDiff', dateDiffValue + 1);
            }

        }
       

    }
    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? "simple-popover" : undefined;

    const DropDownElement = ({ title, value, setValue }) => {
        value = parseInt(value);
        return (
            <div
                style={{
                    padding: 20,
                    display: "block",
                }}
            >
                <span style={{ fontSize: 13, marginRight: 20 }}>{title}</span>
                <div style={{ position: "relative", float: "right" }}>
                    <Button
                        variant="outlined"
                        style={{
                            color: "#009182",
                            borderColor: "#009182",
                            marginRight: 10,
                            fontSize: 14,
                        }}
                        onClick={() => {
                            const newValue = value - 1;
                            setIsSelectValueChanged(true);
                            if (title === "Children" && newValue >= 0) {
                                setValue(newValue);
                                localStorage.setItem('selectedChilds', newValue);
                            } else if (newValue >= 1) {
                                if (title === 'Adults') {
                                    localStorage.setItem('selectedAdults', newValue);
                                } else {
                                    localStorage.setItem('selectedRooms', newValue);
                                }

                                setValue(newValue);
                            }
                        }}
                    >
                        -
                    </Button>
                    <Typography style={{ display: "inline", fontSize: 13 }}>
                        {value}
                    </Typography>
                    <Button
                        variant="outlined"
                        style={{
                            color: "#009182",
                            borderColor: "#009182",
                            marginLeft: 10,
                            fontSize: 14,
                        }}
                        onClick={() => {
                            const newValue = value + 1;
                            setIsSelectValueChanged(true);
                            if (title === "Children") {
                                localStorage.setItem('selectedChilds', newValue);
                            } else if (title === 'Adults') {
                                localStorage.setItem('selectedAdults', newValue);
                            } else {
                                localStorage.setItem('selectedRooms', newValue);
                            }
                            setValue(newValue);
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>
        );
    };




    return (
        <div >
            {/* <Grid className={classes.gridsapce}> */}
            <Grid style={{ marginTop: "15px" }}>


                <Paper
                    style={{
                        borderRadius: 8,
                        padding: "12px 20px 20px 20px",
                        display: "flex",
                        backgroundColor: "white",
                        backgroundColor: "#ffffff",
                        boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px"
                    }}
                >
                    <Grid sm={12} container direction="row" alignItems="center">



                        <Grid xs={12} sm={4}>
                            <span
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "12px"
                                }}
                            >
                                Check In
                            </span>
                            <div className={classes.dates}>

                                <div style={{ marginRight: "10px" }} className={classes.picker}>
                                    <DateRangePicker
                                        style={{ zIndex: 999 }}
                                        startDate={checkInDate}
                                        startDateId="start_date_id"
                                        endDate={checkOutDate}
                                        endDateId="end_date_id"
                                        onDatesChange={({ startDate, endDate, $event }) => {
                                            console.log($event)
                                            onDateChange(startDate, endDate)
                                        }}
                                        focusedInput={focusedInput}
                                        onFocusChange={(focusedInput) => {
                                            setFocusedInput(focusedInput)
                                        }}
                                        numberOfMonths={2}

                                        displayFormat="DD-MM-YYYY"
                                        isOutsideRange={day => moment(day).isBefore(moment(), 'day')}
                                        // monthFormat="dd-mm-yyyy"
                                        block={true}
                                        orientation={window.innerWidth > 600 ? HORIZONTAL_ORIENTATION : VERTICAL_ORIENTATION}

                                    />
                                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                   className={classes.picker}
                                            label="Check In"
                                            inputFormat="dd/MM/yyyy"
                                            disablePast
                                            value={checkInDate}
                                            onChange={(newValue) => {
                                                onDateChange(newValue, 'checkInDate')
                                            }}
                                            renderInput={(params) => <TextField className={classes.picker} {...params} />}
                                        />
                                    </LocalizationProvider> */}
                                </div>
                                {/* <div className={classes.picker}>
                                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                        className={classes.picker}
                                            label="Check Out"
                                            inputFormat="dd/MM/yyyy"
                                            disablePast
                                            value={checkOutDate}
                                            onChange={(newValue) => {
                                                onDateChange(newValue, 'checkoutDate')

                                            }}
                                            renderInput={(params) => <TextField  className={classes.picker} {...params} />}
                                        />
                                    </LocalizationProvider> 
                                </div> */}
                            </div>
                        </Grid>
                        <Grid xs={12} sm={3.5}>
                            <span
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Guest
                            </span>
                            <Box style={{}}>
                                <Button
                                    aria-describedby={idPopover}
                                    variant="outlined"
                                    onClick={handleClickPopover}
                                    style={{
                                        width: "100%",
                                        height: "46px",
                                        padding: 10,
                                        borderColor: "#a0a0a0",
                                        color: "black",
                                        fontSize: 13,
                                        textTransform: "lowercase",
                                        backgroundColor: "white",
                                    }}
                                //    className={classes.guestpick}
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        color="#009182"
                                        size="lg"
                                        style={{
                                            position: "relative",
                                            right: 15,
                                        }}
                                    />
                                    {`${adults} adults • ${children} children • ${rooms} rooms`}
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        size="sm"
                                        style={{ position: "relative", left: 20 }}
                                    />
                                </Button>
                                <Popover
                                    id={idPopover}
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    <DropDownElement
                                        title={"Adults"}
                                        value={adults}
                                        setValue={setAdults}
                                    />
                                    <DropDownElement
                                        title={"Children"}
                                        value={children}
                                        setValue={setChildren}
                                    />
                                    <DropDownElement
                                        title={"Rooms"}
                                        value={rooms}
                                        setValue={setRooms}
                                    />
                                </Popover>
                            </Box>

                        </Grid>

                        <Grid xs={12} sm={4} container alignItems="flex-end" justifyContent="flex-end">
                            <Link to="/hotels">
                                <button
                                    variant="contained"
                                    size="large"
                                    className={classes.findhotelbtn}
                                    onClick={() => childToParent !== undefined && childToParent(checkInDate, checkOutDate)}
                                // style={{ position: "relative", float: "right" }}
                                >
                                    Search
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {/* </Grid> */}
        </div>
    )
}






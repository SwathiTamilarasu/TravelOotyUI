import React, { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { Grid, Card, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../Utils/config";
import Loader from '../Utils/loader';
import * as moment from 'moment';
import Header from './header'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from './footer';

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
    maingrd:{
        margin: "100px 200px 20px 200px" ,
        "@media (max-width: 500px)": {
            margin:"100px 10px 10px 10px"
          },
    },
    findhotelbtn: {
        marginTop: "10px",
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
        padding: "12px 0px 12px 0px",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        borderTop: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
    },
});

export default function Cancelbooking() {
    const classes = useStyles();
  
    const [isLoading, setIsLoading] = React.useState(false);
    const search = useLocation().search;
    const booking_id = new URLSearchParams(search).get('booking_id');
    const navigate = useNavigate();   
    const onSubmit = () => {
        setIsLoading(true)
        axios.delete(CONFIG.API_URL + `Bookings/BookingId?bookingId=${booking_id}`).then(res => {
            setIsLoading(false)
            if (res.status === 200) {
                alert("Booking canceled successfully")
                navigate('/hotels');
            }
        })
            .catch((err) => {
                setIsLoading(false)
                console.log(err);
            });
        
    }  
    const onCancel = () => {
        navigate('/hotels');
    }
   
    return (
        <div >
            <Header />
            {isLoading && <Loader isLoading={isLoading} />}
            {/* <Grid className={classes.gridsapce}> */}
            <Grid className={classes.maingrd}>

                <Grid>

                    <Card variant="outlined" style={{ padding: "20px", boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }} >
                       
                        <Grid xs={12} sm={12}>
                            <p style={{fontSize:"16px",fontWeight:"bold"}}> Are you Sure you want to Cancel your booking...?</p>

                            <div style={{ textAlign: "right" }}>


                                    <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px" }} size="large" variant="contained" onClick={() => onCancel()}>No</Button>  
                                    <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px",marginLeft:"5px" }} size="large" variant="contained" onClick={() => onSubmit()}>Yes,Cancel</Button>       

                                    </div>
                        </Grid> 
                        

                    </Card>

                </Grid>

            </Grid>
            {/* </Grid> */}
            <Footer />
        </div>
    )
}






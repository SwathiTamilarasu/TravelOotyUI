import React, { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { Grid, Card, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CONFIG } from "../Utils/config";
import Loader from '../Utils/loader';
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

export default function Transaction() {
    const [value, setValue] = React.useState({
        payment_status: "",
        payment_amount: "",
        cf_payment_id: "",
        bank_reference: "",
        payment_time: ""
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const search = useLocation().search;
    const order_id = new URLSearchParams(search).get('order_id');
    const navigate = useNavigate();
    const getPayment = async () => {
        setIsLoading(true)
        axios.get(CONFIG.API_URL + `Payment/${order_id}`).then(res => {
            setIsLoading(false)
            if (res.status === 200) {
                console.log('success')
                setValue(res.data);
            }
        })
            .catch((err) => {
                setIsLoading(false)
                console.log(err);
                // setError(err.response.data.error)
            });
    }
    const onSubmit = () => {
        navigate('/hotels');
    }
    const onSubmitcancel = () => {
        navigate(`/bookingcancellation?booking_id=${order_id}`)
    }
    useEffect(() => {
        getPayment()
    }, [])
    return (
        <div >
            <Header />
            {isLoading && <Loader isLoading={isLoading} />}
            {/* <Grid className={classes.gridsapce}> */}
            <Grid style={{ margin: "100px 200px 20px 200px" }}>

                <Grid>

                    <Card variant="outlined" style={{ padding: "20px", boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }} >
                        {value.payment_status === "SUCCESS" && <Grid xs={12} sm={12}>
                            <div style={{ textAlign: "center" }}>
                                <CheckCircleOutlineIcon style={{ width: "80px", height: "80px", color: "green" }} />
                            </div>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    textAlign: "left"
                                }}
                            >
                                Thank you..!
                            </p>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "26px",
                                    textAlign: "left",
                                    color: "rgb(13, 74, 67)"
                                }}
                            >
                                Your Booking is Confirmed.
                            </p>
                            <p
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: "16px",
                                    textAlign: "left",

                                }}
                            >
                                -  Your transction is &nbsp;{value.payment_status}. with Order ID:&nbsp;{value.cf_payment_id}.
                            </p>
                            <p
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: "16px",
                                    textAlign: "left",

                                }}
                            >
                                -  Payment Amount &nbsp;{value.payment_amount},&nbsp;done with {value.payment_group}.
                            </p>
                            <p
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: "16px",
                                    textAlign: "left",

                                }}
                            >
                                -  We have sent you a email for booking details.
                            </p>
                            <p
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: "16px",
                                    textAlign: "left",

                                }}
                            >
                                -  You can now cancel your Booking Until Check in.
                            </p>
                            <div style={{ textAlign: "right" }}>


                                <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px" }} size="large" variant="contained" onClick={() => onSubmit()}>Continue Booking</Button>      
                                 <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px",marginLeft:"5px" }} size="large" variant="contained" onClick={() => onSubmitcancel()} >Cancel Booking</Button>
                            </div>


                        </Grid> }
                        {value.payment_status === "FAILURE" && <Grid xs={12} sm={12}>
                            <div style={{ textAlign: "center" }}>
                                {/* <CheckCircleOutlineIcon style={{ width: "80px", height: "80px", color: "green" }} /> */}
                            </div>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    textAlign: "left"
                                }}
                            >
                                Sorry..!
                            </p>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "26px",
                                    textAlign: "left",
                                    color: "red"
                                }}
                            >
                                Your Transaction Failed.
                            </p>
                            {/* <p
                                style={{
                                   
                                    fontSize: "16px",
                                    textAlign: "left",

                                }}
                            >
                                -  Your transction is &nbsp;{value.payment_status}. with Order ID:&nbsp;{value.cf_payment_id}.
                            </p> */}
                            <div style={{ textAlign: "right" }}>


                                <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px" }} size="large" variant="contained" onClick={() => onSubmit()}>Continue Booking</Button>  
                                {/* <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px" ,marginLeft:"5px"}} size="large" variant="contained" onClick={() => onSubmitcancel()} >Cancel Booking</Button>    */}
                                  {/* <Button style={{ backgroundColor: "rgb(13, 74, 67)", fontSize: "12px", marginTop: "10px" }} size="large" variant="contained" >Cancel Booking</Button> */}
                            </div>


                        </Grid>}

                    </Card>

                </Grid>

            </Grid>
            {/* </Grid> */}
            <Footer />
        </div>
    )
}






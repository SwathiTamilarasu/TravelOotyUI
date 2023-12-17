import React from 'react'
import { makeStyles } from '@mui/styles'
import { Divider, Grid, Typography,Container } from '@mui/material';
import Logofooter from "../images/footerlogo.svg"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TermsofUse from './termsofUse';
import Aboutus from './aboutus';
import Refunds from './refunds';
import Priceing from './priceing';
import Privacystatment from './privacystatment';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   height:"90vh",
    overflow:"scroll",
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  };

const useStyles = makeStyles({
    root: {
        marginTop: 100,
        backgroundColor:"#f7f7f7",
        color:"rgb(34, 34, 34) !important"
    },
    gridsapce: {
        paddingTop: 30,
        margin:30,
        // marginLeft: 180,
        // marginRight: 180,
    },  
    gridsapcefoot:{
        paddingBottom:10,
        marginTop:15
    }
})
export default function Footer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [footerClick,setFooterClick]=React.useState();
    const handleOpen = (name) => {
        setFooterClick(name);
        setOpen(true);
    };
    const handleClose = () => {
        setFooterClick();
        setOpen(false);
    };
    return (
        <div className={classes.root}>
          
             <Divider style={{marginBottom:"30px"}}/>
           <Container>
            <div className={classes.gridsapce}>
               
            <Grid container spacing={2} >
                <Grid sm={3} xs={12}>
                    <p style={{fontWeight:"bold"}}>Need Help?</p>
                    <p style={{fontSize:"12px"}}>Got Questions? Call us 24/7</p>
                    <p style={{fontSize:"12px"}}>Call :<b> +91 77080 66550 , +91 96002 07309</b></p>
                    <p style={{fontSize:"12px"}}>Email Us: <b>customercare@travelooty.in</b> </p>
                    <br/>
                    <p style={{fontWeight:"bold"}}>Contact Info:</p>
                    <p style={{fontSize:"12px"}}>4/118 B, Kagguchi village<br/>
                    kagguchi Post, The Nilgiris - 643214.</p>
                   
                </Grid>
                <Grid sm={2} xs={12}>
                    <p style={{fontWeight:"bold"}}>Company</p>
                    <p style={{fontSize:"12px",cursor:"pointer"}} onClick={() => handleOpen('about')}>About Us</p>
                    <p style={{fontSize:"12px",cursor:"pointer"}} onClick={() => handleOpen('terms')}>Terms and Conditions</p>
                    <p style={{fontSize:"12px",cursor:"pointer"}} onClick={() => handleOpen('privacystatment')}>Privacy Statement</p>
                    <p style={{fontSize:"12px",cursor:"pointer"}} onClick={() => handleOpen('refunds')}>Refunds / Cancellations</p>
                    <p style={{fontSize:"12px",cursor:"pointer"}} onClick={() => handleOpen('pricing')}>Pricing</p>
                    
                </Grid>
                <Grid sm={2} xs={12}>
                    <p style={{fontWeight:"bold"}}>Other Services &<br/>Support</p>
                    <p style={{fontSize:"12px"}}>Rewards Program</p>
                    {/* <p style={{fontSize:"12px"}}>Partners</p>
                    <p style={{fontSize:"12px"}}>Legal</p>
                    <p style={{fontSize:"12px"}}>Privacy Policy</p> */}
                    <p style={{fontSize:"12px"}}>Customer Service Help</p>
                </Grid>
                <Grid sm={2} xs={12}>
                <p style={{fontWeight:"bold"}}>Quick Links</p>
                {/* <Link to="/login" style={{textDecoration:"none",color:"rgb(34, 34, 34)"}}>
                    <p style={{fontSize:"12px"}}>Your Account</p>
                </Link> */}
                    <p style={{fontSize:"12px"}}>Camping Locations</p>
                    <Link to="/experience" style={{textDecoration:"none",color:"rgb(34, 34, 34)"}}>
                    <p style={{fontSize:"12px"}}>Activities</p>
                    </Link>
                    <Link to="/experience" style={{textDecoration:"none",color:"rgb(34, 34, 34)"}}>
                    <p style={{fontSize:"12px"}}>Blogs</p>
                    </Link>
                  
                </Grid>
                <Grid sm={3} xs={12}>
                    <p style={{fontWeight:"bold"}}>Mailing List</p>
                    <p style={{fontSize:"12px"}}>Sign Up for our mailing lists and get the latest
                       offers and promotions straight in your inbox.</p>
                </Grid>
                </Grid> 
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                  
                    <Typography  id="modal-modal-description" sx={{ mt: 2 }}>
                   {/* diff components      */}
                  {footerClick==='terms' &&  <TermsofUse/>}
                  {footerClick==='about' &&   <Aboutus/>}
                  {footerClick==='refunds' &&  <Refunds/>}
                  {footerClick==='pricing' &&  <Priceing/>}
                  {footerClick==='privacy' &&  <TermsofUse/>}
                  {footerClick==='privacystatment' &&  <Privacystatment/>}
                  
                   
                   
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                    <Button
                  size="large"
                  style={{
                      justifyContent:"center",
                    backgroundColor: "rgb(13, 74, 67)",
                    color: "white",
                    padding: "10px 25px 10px 25px",
                    fontSize: "12px",
                    marginTop:"15px"
                  }}
                  onClick={handleClose}
                >
                  Proceed
                </Button>
                </Grid>
                    </Box>
                </Modal>      
            </div>
            <Divider style={{marginTop:"30px"}}/>
            <div className={classes.gridsapcefoot}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid>
                        <p>All rights reserved © 2023 Travel Ooty</p>
                            {/* <img
                                src={Logofooter}
                                alt="blog"
                                class="img-responsive"
                                style={{ width: "100%",height:"50px" }}
                            /> */}
                    </Grid>
                    <Grid style={{display:"flex",alignItems:"center"}}>
                        <LanguageIcon style={{fontSize:"26px",margin:"0px 5px"}}/>
                        <span><p style={{padding:"10px 15px 0px 5px"}}>English</p></span>
                        <a href="https://twitter.com/travelooty"target="_blank" style={{textDecoration:"none",color:"black"}} >    <TwitterIcon style={{fontSize:"26px",margin:"5px 10px 0px 10px"}} /></a>
                        <a href="https://www.facebook.com/travelooty"target="_blank" style={{textDecoration:"none",color:"black"}} >    <FacebookIcon style={{fontSize:"26px",margin:"5px 10px 0px 10px"}} /></a>
                   <a href="https://instagram.com/travelooty?igshid=YmMyMTA2M2Y=" target="_blank" style={{textDecoration:"none",color:"black"}} >    <InstagramIcon style={{fontSize:"26px",margin:"5px 10px 0px 10px"}}  /></a>
                    </Grid>
                </Grid>
                </div>
          
                </Container> 
        </div>
    )
}

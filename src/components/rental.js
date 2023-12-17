import React from 'react'
import Header from "./header";
import Footer from "./footer";
import { makeStyles } from "@mui/styles";
import Rentalcheckin from './rentalcheckin.';
import { Grid, Container, Typography, FormControlLabel, FormGroup, Checkbox, Button,Modal,Box,SwipeableDrawer} from "@mui/material";
import Imglist from "../images/Group 479@2x.png";
import Seater from "../images/seater.svg";
import Gear from "../images/gear.svg";


const useStyles = makeStyles({
    root: {
        marginTop: 100,
    },
});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Rental() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
    <RentalFilter/>
    </Box>
  );


    const RentalFilter = () => {
        return (
            
            <div
            style={{
                backgroundColor: "#f7f7f7",
                padding: "20px",
                borderRadius: "8px",
                marginTop: "20px",
            }}
        >
    <span style={{display:"flex",marginBottom:"15px"}}>
    <Button size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",textTransform:"capitalize",padding:"5px 30px 5px 30px",fontSize:"10px"}}>4 Wheeler</Button>
    <Button size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",marginLeft:"15px",textTransform:"capitalize",padding:"5px 30px 5px 30px",fontSize:"10px"}}>2 Wheeler</Button>
    </span>
            <Typography
                style={{ color: "#1c4076", fontWeight: "bold", fontSize: "12px" }}
            >
                Vehicle Type
           </Typography>
            <FormGroup>
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox defaultChecked />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Hatchback
                </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Sedan
                  </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            SUV
                    </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Jeep
                 </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
            </FormGroup>
            <Typography
                style={{
                    color: "#1c4076",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    fontSize: "12px",
                }}
            >
                Transmission
           </Typography>
            <FormGroup>
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox defaultChecked />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Manual
              </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Automatic
                 </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />



            </FormGroup>
            <Typography
                style={{
                    color: "#1c4076",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    fontSize: "12px",
                }}
            >
                Fuel Type
        </Typography>
            <FormGroup>
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox defaultChecked />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Petrol
               </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Diesel
               </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />
                <FormControlLabel
                    style={{ marginBottom: "-7px" }}
                    control={<Checkbox />}
                    label={
                        <Typography style={{ fontSize: "13px", color: "#1c4076" }}>
                            Electric
               </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                />



            </FormGroup>
        </div>
        );
    };
    return (
        <div className={classes.root}>
            <Header />
            <Container maxWidth="lg">
                <Rentalcheckin />
                <div style={{ marginTop: "30px" }}>
                    <Grid container>
                    {[ 'bottom'].map((anchor) => (
                        <Grid sx={{ display: { xs: 'block',md:'none' } }}  key={anchor}>
                        <Button size="large" style={{height:"50px",fontSize:"14px",position:"fixed",bottom:0,left:0,backgroundColor:"white",color:"black",zIndex:999,border:"1px solid black"}} fullWidth  onClick={toggleDrawer(anchor, true)}>
                            Filter
                        </Button>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}
                            >
                                {list(anchor)}
                            </SwipeableDrawer>
                        </Grid>
                          ))}
                        
                        <Grid md={3}  sx={{ display: { xs: 'none',md:'block' } }}>
                       <RentalFilter/>
                        </Grid>
                        <Grid md={9} xs={12} style={{marginTop:"35px"}}>
                            <Grid container spacing={2}>
                                <Grid md={6} xs={12}>
                                    <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                                        <Grid
                                            container
                                            xs={12}
                                            style={{
                                                border: "1px solid lightgray",
                                                borderRadius: "8px",
                                                padding: "10px",
                                            }}
                                        >
                                            <Grid xs={5}>
                                                <img
                                                    src={Imglist}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid xs={7} >

                                               <p style={{padding:"0px 15px",fontWeight:"bold",fontSize:"14px"}}>Swift Dzire</p>
                                               <Grid style={{padding:"0px 15px"}}  container alignItems="center" justifyContent="space-between">
                                                   <Grid style={{display:"flex"}}>
                                                   <img
                                                    src={Seater}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}

                                                />
                                                       <p style={{fontSize:"12px"}}>5 Seater</p>
                                                   </Grid>
                                                   <Grid style={{display:"flex"}}>
                                                   <img
                                                    src={Gear}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}

                                                />
                                                       <p style={{fontSize:"12px"}}>Manual</p>
                                                   </Grid>

                                               </Grid>
                                               <p style={{color:"#009182",fontWeight:"bold",fontSize:"16px",padding:"15px 20px 5px 20px"}}>1000/ Day</p>
                                               <Button onClick={handleOpen} size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",marginLeft:"15px",textTransform:"capitalize",padding:"5px 30px 5px 30px"}}>Reserve</Button>
                                               <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                <div style={{display:"flex"}}>
                                                <div>    
                                                <img
                                                    src={Imglist}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "120px",height:"100px" }}
                                                />
                                                </div>
                                                <div>
                                                 <p style={{padding:"0px 15px",fontWeight:"bold",fontSize:"14px"}}>Swift Dzire</p>
                                                    <div>
                                                        <p style={{fontSize:"12px",padding:"0px 15px"}}>Manual | 5 Seater</p>
    
                                                    </div>
                                                </div>    
                                                </div><br/>
                                             <Grid  container justifyContent="space-between" alignItems="center">   
                                                <Grid style={{margin:"5px"}}>
                                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>Date</p>
                                                    <p style={{fontSize:"12px",padding:"5px 15px 5px 15px",backgroundColor:"#f6f7f9",borderRadius:"7px"}}>Jan 14-2021 &nbsp;&nbsp; To &nbsp;&nbsp;  Jan 17-2021</p>
                                                </Grid>
                                                <Grid style={{margin:"5px"}}>
                                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>Pickup Location</p>
                                                    <p style={{fontSize:"12px",padding:"5px 15px 5px 15px",backgroundColor:"#f6f7f9",borderRadius:"7px"}}>Coonoor</p>
                                                </Grid>
                                            </Grid> 
                                            <p style={{fontSize:"12px",fontWeight:"bold"}}>Price</p>
                                            <Grid style={{backgroundColor:"#f6f7f9",borderRadius:"7px",padding:"15px"}} container justifyContent="space-between" alignItems="center">
                                                <Grid>
                                                    <p style={{fontSize:"12px"}}>Rental Charges</p>
                                                    <p style={{fontSize:"12px"}}>Tax</p>
                                                </Grid>
                                                <Grid>
                                                    <p style={{fontSize:"12px"}}>2400</p>
                                                    <p style={{fontSize:"12px"}}>0</p>
                                                </Grid>
                                               
                                            </Grid> 
                                            <Grid style={{padding:"15px"}} container justifyContent="space-between" alignItems="center">
                                                    <Grid>   
                                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>Price</p>  
                                                    </Grid>
                                                    <Grid>
                                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>2400</p> 
                                                    </Grid>

                                            </Grid> 
                                            <Grid style={{padding:"15px"}} container justifyContent="space-between" alignItems="center">
                                                    <Grid>   
                                                       <Button onClick={handleClose} size="large" style={{border:"1px solid #e23428",padding:"5px 25px",color:"#e23428"}} >Cancel</Button>
                                                    </Grid>
                                                    <Grid>
                                                      <Button size="large" style={{backgroundColor:"#0d8074",border:"1px solid #0d8074",color:"white",borderRadius:"5px",padding:"5px 25px"}}>Reserve Vehicle</Button>
                                                    </Grid>

                                            </Grid>
                                                </Box>
                                            </Modal>

                                            </Grid>
                                        </Grid>
                                    </div>
                                  
                                </Grid>
                                <Grid md={6} xs={12}>
                                   
                                <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                                        <Grid
                                            container
                                            xs={12}
                                            style={{
                                                border: "1px solid lightgray",
                                                borderRadius: "8px",
                                                padding: "10px",
                                            }}
                                        >
                                            <Grid xs={5}>
                                                <img
                                                    src={Imglist}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid xs={7} >

                                               <p style={{padding:"0px 15px",fontWeight:"bold",fontSize:"14px"}}>Swift Dzire</p>
                                               <Grid style={{padding:"0px 15px"}} container alignItems="center" justifyContent="space-between">
                                                   <Grid style={{display:"flex"}}>
                                                   <img
                                                    src={Seater}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}

                                                />
                                                       <p style={{fontSize:"12px"}}>5 Seater</p>
                                                   </Grid>
                                                   <Grid style={{display:"flex"}}>
                                                   <img
                                                    src={Gear}
                                                    alt="blog"
                                                    class="img-responsive"
                                                    style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}

                                                />
                                                       <p style={{fontSize:"12px"}}>Manual</p>
                                                   </Grid>

                                               </Grid>
                                               <p style={{color:"#009182",fontWeight:"bold",fontSize:"16px",padding:"15px 20px 5px 20px"}}>1000/ Day</p>
                                               <Button size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",marginLeft:"15px",textTransform:"capitalize",padding:"5px 30px 5px 30px"}}>Reserve</Button>

                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid md={6} xs={12}>
                                   
                                   <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                                           <Grid
                                               container
                                               xs={12}
                                               style={{
                                                   border: "1px solid lightgray",
                                                   borderRadius: "8px",
                                                   padding: "10px",
                                               }}
                                           >
                                               <Grid xs={5}>
                                                   <img
                                                       src={Imglist}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "100%" }}
                                                   />
                                               </Grid>
                                               <Grid xs={7} >
   
                                                  <p style={{padding:"0px 15px",fontWeight:"bold",fontSize:"14px"}}>Swift Dzire</p>
                                                  <Grid style={{padding:"0px 15px"}} container alignItems="center" justifyContent="space-between">
                                                      <Grid style={{display:"flex"}}>
                                                      <img
                                                       src={Seater}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}
   
                                                   />
                                                          <p style={{fontSize:"12px"}}>5 Seater</p>
                                                      </Grid>
                                                      <Grid style={{display:"flex"}}>
                                                      <img
                                                       src={Gear}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}
   
                                                   />
                                                          <p style={{fontSize:"12px"}}>Manual</p>
                                                      </Grid>
   
                                                  </Grid>
                                                  <p style={{color:"#009182",fontWeight:"bold",fontSize:"16px",padding:"15px 20px 5px 20px"}}>1000/ Day</p>
                                                  <Button size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",marginLeft:"15px",textTransform:"capitalize",padding:"5px 30px 5px 30px"}}>Reserve</Button>
   
                                               </Grid>
                                           </Grid>
                                       </div>
                                   </Grid>
                                   <Grid md={6} xs={12}>
                                   
                                   <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                                           <Grid
                                               container
                                               xs={12}
                                               style={{
                                                   border: "1px solid lightgray",
                                                   borderRadius: "8px",
                                                   padding: "10px",
                                               }}
                                           >
                                               <Grid xs={5}>
                                                   <img
                                                       src={Imglist}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "100%" }}
                                                   />
                                               </Grid>
                                               <Grid xs={7} >
   
                                                  <p style={{padding:"0px 15px",fontWeight:"bold",fontSize:"14px"}}>Swift Dzire</p>
                                                  <Grid style={{padding:"0px 15px"}} container alignItems="center" justifyContent="space-between">
                                                      <Grid style={{display:"flex"}}>
                                                      <img
                                                       src={Seater}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}
   
                                                   />
                                                          <p style={{fontSize:"12px"}}>5 Seater</p>
                                                      </Grid>
                                                      <Grid style={{display:"flex"}}>
                                                      <img
                                                       src={Gear}
                                                       alt="blog"
                                                       class="img-responsive"
                                                       style={{ width: "12px",height:"12px",margin:"2px 5px 0px 5px" }}
   
                                                   />
                                                          <p style={{fontSize:"12px"}}>Manual</p>
                                                      </Grid>
   
                                                  </Grid>
                                                  <p style={{color:"#009182",fontWeight:"bold",fontSize:"16px",padding:"15px 20px 5px 20px"}}>1000/ Day</p>
                                                  <Button size="small" style={{backgroundColor:"#0d8074",color:"white",borderRadius:"5px",marginLeft:"15px",textTransform:"capitalize",padding:"5px 30px 5px 30px"}}>Reserve</Button>
   
                                               </Grid>
                                           </Grid>
                                       </div>
                                   </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

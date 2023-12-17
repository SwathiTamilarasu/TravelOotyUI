import React from "react";
import { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, Typography,Container } from "@mui/material";
import stayonce from "../images/stayonce@2x.png";
import Travel from "../images/Travel2@2x.png";
import Car from "../images/car.png"
import Besthotel from "../images/besthotel1.svg";
import Digitalguide from "../images/digitalguide1.svg";
import Support from "../images/Support1.svg";
import Banner from "../images/bb5.png";
import Easybooking from "../images/easybooking1.svg";
import Blog from "../images/Blog2x.png";
import Blog1 from "../images/Blog12x.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Rating from "@mui/material/Rating";
import addWeeks from "date-fns/addWeeks";

import Header from "./header";
import Footer from "./footer";

import botanical from "../images/ooty/botanical.jpg";
import kethivalley from "../images/coonoor/kethivalley.jpg";
import mudumalai from "../images/ooty/mudumalai.jpg";
import lawsfalls from "../images/coonoor/lawsfalls.jpg";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
import {

  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Checkin from "./checkin";

const useStyles = makeStyles({
  root: {
    marginTop: 70,
  },
  explloc: {
    color: "#1C4076",
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 100,
  },
  abt:{
    // color: "#1C4076",
    fontSize: 16,
    // fontWeight: "bold",
    paddingTop: 15,
    textAlign:"center",
    textAlign:"justify",
    // lineHeight: 1.5,
  
  },
  stay: {
    paddingTop: 30,
  },
  gridsapce: {
    paddingTop: 30,
  
  },
  gridsapce: {
   
    "@media (max-width: 1100px)": {
      paddingTop: 30,
   
    },
    "@media (min-width: 1100px)": {
      paddingTop: 30,
   
    }
  },
  hidemob:{
    "@media (max-width: 650px)": {
      display:"none"
   
    },

  },
  findhotel:{
    "@media (max-width: 1100px)": {
      borderRadius: 5,
    margin: "-70px 10px 0px 10px",
    zIndex:99
    },
    "@media (min-width: 1100px)": {
      borderRadius: 5,
      margin: "-70px 180px 0px 180px",
      zIndex:99
    }
},
banimg:{
  "@media (max-width: 500px)": {
    display:'none'
  },

},

  headings: {
    fontSize: 28,
    fontWeight: "bold",
  },
  chip: {
    fontSize: 12,
    width: 100,
    cursor: "pointer",
  },
  selectdate: {
    "& .css-1at62qq": {
      margin: "0px",
    },
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
  person: {
    padding: "12px 40px 12px 40px",
    border: "1px solid lightgrey",
    borderRadius: "5px",
    margin: "0px 10px 0px 10px",
    color: "grey",
    fontSize: "13px",
  },
  findhotelbtn: {
    backgroundColor: "#009182",
    color: "white",
    fontSize: "14px",
    border: "none",
    padding: "14px 20px 14px 20px",
    borderRadius: "5px",
    marginRight: "15px",
  },
  container: {
    position: 'relative',
    color:'white',
    "@media (max-width: 500px)": {
      marginTop:"100px"
    },
  },
  bottomLeft:{
    // backgroundColor:"#00000094",
    position: 'absolute',
  top: "38%",
  left: "25%",
  transform:"translate(-50%, -50%)"
  // transform: translate(-50%, -50%);
    // borderRadius:"10px",
    // padding:"20px"
  },
  centered :{
    position: 'relative',
    // top: '99%',
    // left: '10%',
    // transform: 'translate(-50%, -50%)'
  }
});
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState([null, null]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userId, setUserId] = React.useState(localStorage.getItem('userId'));


  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      const element = document.getElementById('carrent');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  // const DiscoverNewPlace1 = () => {
  //   return (
  //     <Grid item xs={6} md={10} style={{ marginBottom: 60 }}>
  //       <img
  //         src={D1}
  //         alt="blog"
  //         class="img-responsive"
  //         style={{ width: "100%" }}
  //       />
  //       <p style={{ color: "white", paddingTop: "15px" }}>
  //         Glenmorg valley view
  //       </p>
  //     </Grid>
  //   );
  // };
  // const DiscoverNewPlace2 = () => {
  //   return (
  //     <Grid item xs={6} md={10}>
  //       <img
  //         src={D2}
  //         alt="blog"
  //         class="img-responsive"
  //         style={{ width: "100%" }}
  //       />
  //       <p style={{ color: "white", paddingTop: "15px" }}>Dolphin nose</p>
  //     </Grid>
  //   );
  // };
  // const DiscoverNewPlace3 = () => {
  //   return (
  //     <Grid item xs={6} md={10}>
  //       <img
  //         src={D1}
  //         alt="blog"
  //         class="img-responsive"
  //         style={{ width: "100%" }}
  //       />
  //       <p style={{ color: "white", paddingTop: "15px" }}>Pykara lake</p>
  //     </Grid>
  //   );
  // };

  // const PopularStayItem = () => {
  //   return (
  //     <Grid item xs={12} >
  //       <Card sx={{ maxWidth: 345 }} style={{margin:"10px"}}>
  //         <CardMedia
  //           component="img"
  //           height="200"
  //           image={hotel}
  //           alt="green iguana"
  //         />
  //         <CardContent>
  //           <Typography gutterBottom variant="h5" component="div">
  //             Hotel Name
  //           </Typography>
  //           <Grid container justifyContent="space-between">
  //             <Grid>
  //               <p>ooty</p>
  //             </Grid>
  //             <Grid>
  //               <Rating name="read-only" value={value} readOnly />
  //             </Grid>
  //           </Grid>
  //           <Grid container justifyContent="space-between">
  //             <Grid>
  //               <p
  //                 style={{
  //                   color: "#21BFAD",
  //                   fontSize: "12px",
  //                   fontWeight: "bold",
  //                 }}
  //               >
  //                 4600/Night
  //               </p>
  //             </Grid>
  //             <Grid>
  //               <Button
  //                 variant="contained"
  //                 size="small"
  //                 style={{
  //                   backgroundColor: "#FFBF2E",
  //                   color: "white",
  //                   boxShadow: "none",
  //                 }}
  //               >
  //                 Book Now
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   );
  // };

 
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={2}>
        {/* <Grid xs={12} md={6} className={classes.hidemob}>
          <div style={{ paddingLeft: "120px", paddingTop: "140px" }}>
            <p style={{ fontSize: "60px", color: "white", fontWeight: "bold" }}>
              Find your <span style={{ color: "white" }}>comfy</span> <br />
              shelter
            </p>
            <p
              style={{
                fontSize: "18px",
                color: "white",
                paddingRight: "100px",
                lineHeight: "25px",
              }}
            >
              Pick your destination and we'll provide you
              <br /> the most affordable hotel, inn, <br />
              resort, or cottage
            </p>
          </div>
        </Grid> */}
        <Grid xs={12} md={12}>
         <div className={classes.container}>
            <img
            src={Banner}
            alt="blog"
            class="img-responsive"
            style={{ width:"100%" }}
            className={classes.banimg}
          />
            <div className={classes.bottomLeft}>
            <p style={{ fontSize: "60px", color: "white", fontWeight: "bold",textAlign:"left" }}>
              Find your comfy<br/>
              shelter
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "white",
                textAlign:"left",
                fontStyle:"italic"
              }}
            >
              Pick your destination and we'll provide you
               the <br/> most affordable stays
            </p>

            </div>
            <div className={classes.centered}>
            <Paper className={classes.findhotel}>
              <Checkin/>
            </Paper>
            </div>
           
          </div>
          {/* <img
            src={Banner}
            alt="blog"
            class="img-responsive"
            style={{ padding: "70px 40px 100px 0px" }}
          /> */}
        </Grid>
      </Grid>
      <Grid>
        {/* <Paper className={classes.findhotel}>
          <Checkin/>
        </Paper> */}
      </Grid>

      {/* <Grid container justifyContent="center" direction="column" alignItems="center">
        <p className={classes.explloc}> About Us</p>
        <Container>
        <p className={classes.abt}> Travel Ooty is an Indian travel management company. It is a personal travel agent offering several services including booking, guiding, rented vehicles, such as bikes and cars, and accommodations, such as hotels, inns, resorts, and cottages depending on the requirements of backpackers and luxury travelers across the Nilgiris district. Travel Ooty provides easy accessibility for both customers and property owners.</p>
        </Container>
      </Grid> */}
      
<div className={classes.hidemob}>
     
      <Grid container justifyContent="center">
        <p className={classes.explloc}> Discover New Places</p>
      </Grid>
      {/* <Grid className={classes.stay}>
        <img
          src={stayonce}
          alt="stay"
          class="img-responsive"
          style={{ width: "100%" }}
        />
      </Grid> */}
      {/* <Grid className={classes.gridsapce}>
      <Container>
        <p className={classes.headings} style={{ color: "#1C4076" }}>
          Popular <span style={{ color: "#009182" }}>stay</span>
        </p>
        <p style={{ color: "#1C4076", fontSize: "15px" }}>
          Because the rock was laid down in layers, there is a variation in the
          hardness of the rock formed. When water runoff trickles across the
          rock, some areas erode rapidly whereas others hold firm. This
          variation in erosion speed causes the formation of pinnacles, or
          “hoodoos” of stable rock.
        </p>
        <Grid
          container
          justifyContent="space-between"
          style={{ paddingTop: 20 }}
        >
          <Grid>
            <Stack direction="row" spacing={2} style={{ flexWrap:"wrap",margin:"5px" }}>
              <Chip
                label="Ooty"
                className={classes.chip}
                style={{
                  backgroundColor: "#21BFAD",
                  color: "white",
                  fontSize: 12,
                  width: 100,
                  cursor: "pointer",
                }}
              />
              <Chip
                label="Coonoor"
                variant="outlined"
                className={classes.chip}
                style={{ fontSize: 12, width: 100, cursor: "pointer" }}
              />
              <Chip
                label="Masinagudi"
                variant="outlined"
                className={classes.chip}
                style={{ fontSize: 12, width: 100, cursor: "pointer" }}
              />
              <Chip
                label="Kotagiri"
                variant="outlined"
                className={classes.chip}
                style={{ fontSize: 12, width: 100, cursor: "pointer" }}
              />
            </Stack>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              size="large"
              style={{ color: "#21BFAD", borderColor: "#21BFAD" }}
            >
              Explore
            </Button>
          </Grid>
        </Grid>
        </Container>
      </Grid> */}

      {/* <Grid className={classes.gridsapce}>
      <Container>
        <Grid container spacing={2}>
          <Carousel
            show={3}
            responsive
            swiping
            leftArrow={
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginTop: 120, marginRight: 10 }}
              />
            }
            rightArrow={
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginTop: 120, marginLeft: 10 }}
              />
            }
          >
            <PopularStayItem />
            <PopularStayItem />
            <PopularStayItem />
            <PopularStayItem />
            <PopularStayItem />
          </Carousel>
        </Grid>
        </Container>
      </Grid> */}
      {/* <Grid style={{ backgroundColor: "#000000", marginTop: 60 }}>
        <Grid className={classes.gridsapce}>
        <Container>
          <p className={classes.headings} style={{ color: "white" }}>
            Discover New Places
          </p>
          <p style={{ color: "white", fontSize: "15px" }}>
            Because the rock was laid down in layers, there is a variation in
            the hardness of the rock formed. When water runoff trickles across
            the rock, some areas erode rapidly whereas others hold firm. This
            variation in erosion speed causes the formation of pinnacles, or
            “hoodoos” of stable rock..
          </p>
          <Grid container spacing={4} style={{ marginTop: 30 }}>
            <Carousel
              show={3}
              responsive
              swiping
              leftArrow={
                <FontAwesomeIcon
                  color="white"
                  icon={faArrowLeft}
                  style={{ marginTop: 120, marginRight: 10 }}
                />
              }
              rightArrow={
                <FontAwesomeIcon
                  color="white"
                  icon={faArrowRight}
                  style={{ marginTop: 120, marginLeft: 10 }}
                />
              }
            >
              <DiscoverNewPlace1 />
              <DiscoverNewPlace2 />
              <DiscoverNewPlace3 />
              <DiscoverNewPlace1 />
              <DiscoverNewPlace2 />
              <DiscoverNewPlace3 />
            </Carousel>
          </Grid>
          </Container>
        </Grid>
      </Grid> */}
</div>
      <Grid className={classes.gridsapce}>
      <Container>
        {/* <p className={classes.headings} style={{ color: "#1C4076" }}>
        Discover New Places
        </p> */}
        {/* <p style={{ color: "#1C4076", fontSize: "15px" }}>
          Because the rock was laid down in layers, there is a variation in the
          hardness of the rock formed. When water runoff trickles across the
          rock, some areas erode rapidly whereas others hold firm. This
          variation in erosion speed causes the formation of pinnacles, or
          “hoodoos” of stable rock.
        </p> */}
        <Grid
          container
          spacing={4}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Grid item xs={12} md={3}>
          <Link to="/experience" style={{textDecoration:"none"}}>
            <img
              src={botanical}
              alt="blog"
              class="img-responsive"
              style={{ width: "100%",borderRadius:"8px" }}
            />
           
            <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: 16,
                fontWeight: "bold",
                padding: "15px 0px 0px 0px",
              }}
            >
              Ooty
            </p>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
          <Link to="/experience" style={{textDecoration:"none"}}>
            <img
              src={kethivalley}
              alt="blog"
              class="img-responsive"
              style={{ width: "100%",borderRadius:"8px" }}
            />
            <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: 16,
                fontWeight: "bold",
                padding: "15px 0px 0px 0px",
              }}
            >
              Coonoor
            </p>
            </Link>
           
          </Grid>
          <Grid item xs={12} md={3}>
          <Link to="/experience" style={{textDecoration:"none"}}>
            <img
              src={lawsfalls}
              alt="blog"
              class="img-responsive"
              style={{ width: "100%" ,borderRadius:"8px"}}
            />
            <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: 16,
                fontWeight: "bold",
                padding: "15px 0px 0px 0px",
              }}
            >
              Kotagiri
            </p>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
          <Link to="/experience" style={{textDecoration:"none"}}>
            <img
              src={mudumalai}
              alt="blog"
              class="img-responsive"
              style={{ width: "100%" ,borderRadius:"8px"}}
            />
            <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: 16,
                fontWeight: "bold",
                padding: "15px 0px 0px 0px",
              }}
            >
              Masinagudi
            </p>
            </Link>
          </Grid>
        </Grid>
        </Container>
      </Grid>

      <Grid className={classes.gridsapce}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{ paddingTop: 115 }}>
            <p className={classes.headings} style={{ color: "#1C4076" }}>
              Why choose <span style={{ color: "#009182" }}>Travel Ooty ?</span>
            </p>
            <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: "15px",
                paddingRight: "64px",
                paddingTop: 20,
                lineHeight: 2,
              }}
            >
              Pick your destination and we'll provide you the most affordable
              hotel, inn, resort, or cottage
            </p>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ paddingTop: 40 }}
            >
              <Grid style={{ display: "flex", alignItems: "center" }}>
                <img src={Besthotel} alt="hotel" class="img-responsive" />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "rgb(0 0 0)",
                    paddingLeft: "15px",
                  }}
                >
                  Best hotels
                </p>
              </Grid>
              <Grid style={{ display: "flex", alignItems: "center" }}>
                <img src={Digitalguide} alt="guide" class="img-responsive" />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "rgb(0 0 0)",
                    paddingLeft: "15px",
                  }}
                >
                  Digital guide
                </p>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ paddingTop: 40 }}
            >
              <Grid style={{ display: "flex", alignItems: "center" }}>
                <img src={Easybooking} alt="booking" class="img-responsive" />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "rgb(0 0 0)",
                    paddingLeft: "15px",
                  }}
                >
                  Easy booking
                </p>
              </Grid>
              <Grid style={{ display: "flex", alignItems: "center" }}>
                <img src={Support} alt="support" class="img-responsive" />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "rgb(0 0 0)",
                    paddingLeft: "15px",
                  }}
                >
                  24*7 support
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={Travel}
              alt="blog"
              class="img-responsive"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        </Container>
      </Grid>
      <div id="carrent"></div>
      <Grid >
      <Container>
        <div className={classes.gridsapce} style={{ marginTop:50 }}>
          <Grid
            container
            justifyContent="space-between"
            // style={{ padding: "10px 30px 30px 30px", }}
          >
            <Grid item xs={12} md={6}>
              <p
                style={{
                  color: "#1c4076",
                  fontWeight: "bold",
                  fontSize: "28px",
                }}
              >
                Rent a car / Exclusive tour packages
              </p>
              <p
              style={{
                color: "rgb(0 0 0)",
                fontSize: "15px",
                paddingRight: "64px",
                paddingTop: 10,
                lineHeight: 2,
              }}
            >
              Looking to hire a vehicle? or Looking for one day tour packages? <br/> You can get in touch below.<br/>
              Call us:<b> +91 9600207309 / +91 7708066550 </b><br/>
              Email us: <b>info@travelooty.in</b>
            </p>
            </Grid>
            <Grid >
            <img
              src={Car}
              alt="blog"
              class="img-responsive"
              style={{ height: "300px"}}
            />
            </Grid>
          </Grid>
        </div>
        </Container>
      </Grid>

      <Grid >
      <Container>
        <div className={classes.gridsapce} style={{ backgroundColor: "#f6f7f9",borderRadius:"5px",marginTop:50 }}>
          <Grid
            container
            justifyContent="space-between"
            style={{ padding: "10px 30px 30px 30px", }}
          >
            <Grid>
              <p
                style={{
                  color: "#1c4076",
                  fontWeight: "bold",
                  fontSize: "28px",
                }}
              >
                List your property with <br />
                Travel Ooty
              </p>
              {/* <p style={{ color: "#1c4076", fontSize: "12px" }}>
                {" "}
                When testing out typography it’s a good idea to pick a <br />{" "}
                pangram: a phrase that includes every letter in the alphabet.
              </p> */}
            </Grid>
            <Grid>
              <p
                style={{
                  color: "#1c4076",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Call Us Now
              </p>
              <p
                style={{
                  color: "#1c4076",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                +91 77080 66550
              </p>
              {userId!=null?<Link to="/propertyForm" style={{textDecoration:"none"}}>
                <Button
                  size="large"
                  style={{
                    backgroundColor: "rgb(13, 74, 67)",
                    color: "white",
                    padding: "10px 25px 10px 25px",
                    fontSize: "12px",
                  }}
                >
                  Send a Request
                </Button>
              </Link>:<div></div>}
            </Grid>
          </Grid>
        </div>
        </Container>
      </Grid>
     
      <Footer />
    </div>
  );
}

// import React from 'react'
// import { makeStyles } from '@mui/styles'
// import Header from './header'
// import { useState, useCallback } from "react";
// import { Grid, Typography,Container } from '@mui/material';
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
// import mapexp from "../images/mapexp.png";

// const useStyles = makeStyles({
//     root: {
//         marginTop: 80,
//     },
//     gridspace: {
   
//         "@media (max-width: 1100px)": {
//           paddingTop: 30,
//         //    marginLeft: 100,
//         // marginRight: 100,
//         },
//         "@media (min-width: 1100px)": {
//           paddingTop: 30,
//         //   marginLeft: 180,
//         // marginRight: 180,
//         }
//       },
//     gly:{
//         height:300,
//         overflow:"scroll"
//     }
// })

// const photos = [
//     {
//         src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
//         width: 1,
//         height: 1
//     },
//     {
//         src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/PpOHJezOalU/800x599",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
//         width: 4,
//         height: 3
//     }
// ];

// export default function Viewexperience() {
//     const classes = useStyles();
//     const [currentImage, setCurrentImage] = useState(0);
//     const [viewerIsOpen, setViewerIsOpen] = useState(false);

//     const openLightbox = useCallback((event, { photo, index }) => {
//         setCurrentImage(index);
//         setViewerIsOpen(true);
//     }, []);

//     const closeLightbox = () => {
//         setCurrentImage(0);
//         setViewerIsOpen(false);
//     };
//     return (
//         <div>
//         <Header/>
//         <div className={classes.root}>
//             <Container>
//             <div className={classes.gridspace}>
//                 <Grid >      
//                     <Gallery photos={photos} onClick={openLightbox} className={classes.gly} />
//                     <ModalGateway>
//                         {viewerIsOpen ? (
//                             <Modal onClose={closeLightbox}>
//                                 <Carousel
//                                     currentIndex={currentImage}
//                                     views={photos.map(x => ({
//                                         ...x,
//                                         srcset: x.srcSet,
//                                         caption: x.title
//                                     }))}
//                                 />
//                             </Modal>
//                         ) : null}
//                     </ModalGateway>
//                     </Grid>
//                     <Typography style={{fontSize:"16px",color:"#000000",padding:"20px 0px 5px 0px",fontWeight:"bold"}}>Description</Typography>
//                     <p style={{fontSize:"13px"}}>Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock.</p>
//                     <Typography style={{fontSize:"16px",color:"#000000",padding:"20px 0px 20px 0px",fontWeight:"bold"}}>Map</Typography>
//                     <img
//                     src={mapexp}
//                     alt="blog"
//                     class="img-responsive"
//                     style={{ width: "100%" }}
//                   />
//             </div>
//             </Container>
//         </div>
//         </div>
//     )
// }


import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { Grid, IconButton, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from '../../header';
import Sidebar from './sidebar';
import Mainbar from './mainbar';
const useStyles = makeStyles({
    root: {
      marginTop: 52,
    },
    gridspace: {
      marginLeft: 180,
      marginRight: 180,
    },
    gly: {
      height: 300,
      overflow: "scroll",
    },
    sidebar:{
      width:"250px",
      height:"100%",
      overflow:"hidden",
      zIndex:9,
      position:"fixed"
    },
    mainbar:{
      marginLeft:"260px!important",
      marginTop:"30px!important"
    }
  });

export default function Mainscreen() {
    const classes = useStyles();
    //let { path, url } = useRouteMatch();
    return ( <div >
                <Header/>
                <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item sm={3} md={3} className={classes.sidebar}>
                        <Sidebar/>
                    </Grid>
                    <Grid item sm={9} md={9} className={classes.mainbar}>
                      <Mainbar />                
                        
                    </Grid>
                    
                  </Grid>
                  </div>
              </div>
    )
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import {NavLink} from "react-router-dom"

// const drawerWidth = 240;

// export default function Mainscreen() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Permanent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
         
//             <ListItem button >
//               <ListItemIcon>
//                 <NavLink to={`/roomscreen`}>
//                 <p>Rooms</p>
//                 </NavLink>
//               </ListItemIcon>
//               <ListItemText  />
//             </ListItem>
//             <Divider/>
//             <ListItem button >
//               <ListItemIcon>
//                 <p>Dashboard</p>
//               </ListItemIcon>
//               <ListItemText  />
//             </ListItem>
       
//         </List>
//         <Divider />
       
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//           enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//           imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//           Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//           Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//           nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//           leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//           feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//           consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//           sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//           eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//           neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//           tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//           sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//           tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//           gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//           et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//           tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }
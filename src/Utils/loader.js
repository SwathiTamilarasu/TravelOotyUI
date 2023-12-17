import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Loader(props){
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: 1400 }}
        open={props.isLoading}
        >
          
  <div class="loadermain">
    <span class="loader-text">Travel Ooty</span>
      <span class="load"></span>
  </div>

        {/* <CircularProgress /> */}
      </Backdrop>

    );
}
export default Loader;
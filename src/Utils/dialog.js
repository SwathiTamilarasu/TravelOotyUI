import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

export default function MaxWidthDialog({ isDialogOpened, handleCloseDialog,message,title }) {
 
 
  const [maxWidth] = useState("sm"); 
  const handleClose = () => {   
    handleCloseDialog(false);
  };
  return (
    <React.Fragment>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpened}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{fontSize:"16px",fontWeight:"bold"}}>
         {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{fontSize:"14px",color:"rgb(0, 145, 130)",fontWeight:"bold"}}>
            {message}
          </Typography>         
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import * as moment from 'moment';

import Loader from '../../../Utils/loader';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  thead: {
    fontSize: "14px!important",
    color: "white!important"
  },
  tdata: {
    fontSize: "12px!important"
  }
});

export default function Others() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState(null);
  const [promocodeErrors, setPromocodeErrors] = useState({});
  const [promocodeList, setPromocodeList] = useState([]);
  const intialState = { 
    name: "",
    expiryDate: null,
    discount: 0
  }

  const [promocodeDetails, setPromocodeDetails] = React.useState(intialState)

  const onTextChangeProperty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPromocodeDetails({
      ...promocodeDetails, [name]: value
    })
   }

   const validate = () => {
    let errors = {};
    
    if (!promocodeDetails.name) {
      errors.name = true;
    }
    if (!promocodeDetails.expiryDate) {
      alert("Date is required")
      errors.expiryDate = true;
    }
    if (+promocodeDetails.discount <= 0) {
      errors.discount = true;
    }

    setPromocodeErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  const onSubmit = () => {
    if (validate(promocodeDetails)) { 
      let saveDetails = { ...promocodeDetails }
      saveDetails.discount = +promocodeDetails.discount
      saveDetails.expiryDate = moment(promocodeDetails.expiryDate).format('YYYY-MM-DD');
      setIsLoading(true)
      axios.post(CONFIG.API_URL + 'PromoCodes', saveDetails).then(res => {
        setIsLoading(false)
        if (res.status === 200) {
          alert('Promo Added successfully');
          setPromocodeDetails({...intialState})
          getpromocodeList();
        }
      })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
        });
    } 
  }

  const getpromocodeList = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `PromoCodes`)
      .then(res => {
        setIsLoading(false);
        setPromocodeList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }

  const Delete = async (id) => {
    setIsLoading(true)
    axios.delete(CONFIG.API_URL + `PromoCodes/${id}`).then(res => {
        setIsLoading(false)
        alert("Promo deleted successfully")
        getpromocodeList();
    })
        .catch((err) => {
            setIsLoading(false)
            console.log(err);
        });
  }

  useEffect(() => {
    getpromocodeList()
  }, [])
 
  return (
    <div>
       {isLoading && <Loader isLoading={isLoading}/>}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <p
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#009182",
            }}
          >
            Promo Code
          </p>
        </Grid>
        <Grid>
          
        </Grid>
      </Grid>
      <Grid sm={4}>
         <TextField id="outlined-basic" fullWidth label="Promo Code" variant="outlined" inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                    
                  },
            }}  required name="name" value={promocodeDetails.name} onChange={(e) => onTextChangeProperty(e)} error={promocodeErrors.name} />
      </Grid><br/>
      <Grid sm={4}>
         <TextField id="outlined-basic" fullWidth label="Discount Percentage" variant="outlined" inputProps={{
                  style: {
                    fontSize: 13,
                    fontWeight: "500",
                  },
            }}  required name="discount" value={promocodeDetails.discount} onChange={(e) => onTextChangeProperty(e)} 
            error={promocodeErrors.discount} />
      </Grid><br/>
      <Grid sm={4}>
      <LocalizationProvider
            style={{ fontSize: "18px" }}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              style={{ fontSize: "18px"}}
              fullWidth
              required
              label="Expiry Date"
              value={promocodeDetails.expiryDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setPromocodeDetails({
                  ...promocodeDetails, 'expiryDate': newValue
                })
               }}
               error={promocodeErrors.expiryDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
      </Grid><br/>
      <Grid item container justifyContent="flex-end" xs={4}>
          <Button variant="contained" onClick={() => onSubmit()} >Save</Button>
      </Grid>
      
      <div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "rgb(0, 145, 130)" }}>
              <TableRow>
                <TableCell className={classes.thead}>Si.no</TableCell>
                <TableCell className={classes.thead} align="left">Promo Code</TableCell>
                <TableCell className={classes.thead} align="left">Expiry Date</TableCell>
                <TableCell className={classes.thead} align="left">Discount</TableCell>
                <TableCell className={classes.thead} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promocodeList.map((row, index) => (
                <TableRow key={ index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                   <TableCell component="th" scope="row" className={classes.tdata}>
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tdata}>
                    {row.name}
                  </TableCell>
                  <TableCell align="left" className={classes.tdata}>{ moment(row.expiryDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell align="left" className={classes.tdata}>{row.discount}</TableCell>
                  <TableCell align="left" className={classes.tdata}>
                    <FontAwesomeIcon
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) Delete(row.id) }  }
                      icon={faTrash}
                      color="#009182"
                      size="lg"
                      style={{
                        position: "relative",
                        right: 15,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

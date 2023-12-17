import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Divider, Grid, Typography, Container, Button, TextField } from '@mui/material';
import Imglist from "../../../images/imglist.png";
import Users from "../../../images/users.svg";
import Phone from "../../../images/phone.svg";
import Mail from "../../../images/mail.svg";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { CONFIG } from "../../../Utils/config";
import Loader from '../../../Utils/loader';


const useStyles = makeStyles({
  root: {
    marginTop: 80,
  },
  sidetxt: {
    fontSize: "14px",
    fontWeight: "bold"
  }
});

export default function Roomscreen() {
  const classes = useStyles();
  const [propDetails, setPropDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPropertyDetails = async () => {
    setIsLoading(true)
    await axios.get(CONFIG.API_URL + `Property`)
      .then(res => {
        setIsLoading(false);
        setPropDetails(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })

  }
  // const onPropertyDelete=(propertyID)=>{
  //   axios.delete(CONFIG.API_URL + `Property/${propertyID}`)  
  //     .then(res => {  
  //       setIsLoading(true);
  //       if(res.status==200){
  //         alert('Property Deleted Successfully')
  //         getPropertyDetails()
  //       }

  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log(err);
  //     })

  // }
  const onSwitchChange = (e, rowData) => {
    const checked = e.target.checked
    e.preventDefault();
    setIsLoading(true)
    const saveDetails = [{
      "operationType": 0,
      "path": "/IsActive",
      "op": "Replace",
      "from": "false",
      "value": e.target.checked
    }]
    axios.patch(CONFIG.API_URL + `Property/${rowData.propertyID}`, saveDetails)
      .then(res => {
        setIsLoading(false);
        if (res.status === 200) {
          if (checked == true) {
            alert('Activate successfully');
          } else {
            alert('Deactivate successfully');
          }
          getPropertyDetails();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }
  useEffect(() => {
    getPropertyDetails()
  }, [])
  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", color: "#009182" }}>Hotels Listed</p>
        </Grid>
        <Grid>
          <TextField id="outlined-basic" label="Search" size="small" variant="outlined" style={{ marginRight: "0px", width: "200px" }} />
          <Button variant="outlined" size="small" style={{ color: "#009182", border: "1px solid #009182", fontSize: "12px", textTransform: "capitalize" }}>Search</Button>
        </Grid>

      </Grid>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {propDetails.map((row) => (
          <Grid item xs={6}>
            <Grid
              container
              xs={12}
              style={{
                border: "1px solid lightgray",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <Grid sm={4} xs={12}>
                <img
                  src={row.imagePath || Imglist}
                  alt="blog"
                  class="img-responsive"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid sm={8} xs={12} container style={{ padding: "0px 10px" }}>
                <Grid>
                  <p
                    style={{
                      color: "#1c4076",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {row.name}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {row.address}
                  </p>
                  <div style={{ display: "flex" }}>
                    <div>
                      <img
                        src={Users}
                        alt="blog"
                        class="img-responsive"
                        style={{ width: "15px", height: "15px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p style={{ fontSize: "12px", color: "#000000", fontWeight: "bold" }}>{row.propertierName}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <img
                        src={Phone}
                        alt="blog"
                        class="img-responsive"
                        style={{ width: "15px", height: "15px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p style={{ fontSize: "12px", color: "#000000", fontWeight: "bold" }}>{row.phoneNumber}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <img
                        src={Mail}
                        alt="blog"
                        class="img-responsive"
                        style={{ width: "15px", height: "15px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p style={{ fontSize: "12px", color: "#000000", fontWeight: "bold" }}>{row.email}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <FormGroup>
                        <FormControlLabel control={<Switch checked={row.isActive} onChange={(e) => onSwitchChange(e, row)} />} label="Show Property" />
                      </FormGroup>
                    </div>
                    <div>
                      <Button variant="outlined" size="small" style={{ color: "#f05637", border: "1px solid #f05637", textTransform: "capitalize", fontSize: "10px" }}
                      //  onClick={()=>{onPropertyDelete(row.propertyID)}}
                        >
                         Delete Property</Button>
                    </div>
                  </div>

                </Grid>
              </Grid>
            </Grid>
          </Grid>

        ))}
      </Grid>

    </div>
  )
}

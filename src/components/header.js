import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Logo from "../images/logoheader.svg"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@mui/material';



export default function Header() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const navigate = useNavigate();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const logout = (e) => {

		handleClose();
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('isSuperAdmin');
		localStorage.removeItem('isEmployee');
		localStorage.clear();
		navigate('/');
		window.location.reload(false);
	}
	// const classes=useStyles();
	return (
		<div>
			<div class="header">
				<div class="navbar navbar-default navbar-fixed-top menu-top" style={{ backgroundColor: "#0d4a43", borderColor: "#0d4a43" }}>
					<div class="container">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>

							</button>
							<span class="navbar-brand"><img src={Logo}  style={{ width: "50px", height: "50px", marginTop: "-7px" ,display:"flex"}} alt="logo"
								class="img-responsive" /></span>
								{/* <span style={{color:"white",fontSize:"12px",marginLeft:"10px",fontWeight:"bold",}}>Beta version</span> */}
						</div>
						<div class="navbar-collapse collapse">
							<nav>
								<ul class="nav navbar-nav navbar-right" id="myDIV">
									{localStorage.getItem('isSuperAdmin') !== 'true' && localStorage.getItem('isEmployee') !== 'true' ? <>
										<li>
											<Link to="/">
												<p style={{ color: "white" }}>Home</p>
											</Link>
										</li>
										<li>
											<Link to="/hotels">
												<p style={{ color: "white" }}>Hotel</p>
											</Link>
										</li>
										<li>
											<Link to="/#carrent" >
												<p style={{ color: "white" }}>Car Rental</p>
											</Link>
										</li>
										<li>
											<Link to="/experience">
												<p style={{ color: "white" }}>Experience</p>
											</Link>
										</li></> : ""}
									{
										localStorage.getItem('token') === null ?

											<li>
												<Link to="/login">
													<p style={{ color: "white",fontWeight:"bold" }}>Login</p>
												</Link>
											</li> :
											<li>
												<p style={{ color: "white", paddingTop: "15px", cursor: "pointer", paddingLeft: "10px" }} onClick={handleClick}>
													Hi,&nbsp;{localStorage.getItem('userName')}&nbsp;<span><i class="fa fa-caret-down"></i></span>
												</p>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={open}
													onClose={handleClose}
													MenuListProps={{
														'aria-labelledby': 'basic-button',
													}}
												>
													{(localStorage.getItem('isSuperAdmin') !== 'true'&& localStorage.getItem('isEmployee') !== 'true') && <div><Link to="/profile" style={{ textDecoration: "none" }}>
														<MenuItem style={{ fontSize: "12px", color: "#009182", fontWeight: "bold" }} onClick={handleClose}>Profile</MenuItem>
													</Link>
														<Divider />
													</div>}

													{/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
													<MenuItem style={{ fontSize: "12px", color: "#009182", fontWeight: "bold" }} onClick={(e) => logout(e)}>Logout</MenuItem>
												</Menu>
											</li>
									}



								</ul>
							</nav>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

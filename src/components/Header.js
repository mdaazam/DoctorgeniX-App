import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse, Box, Button, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Search, Account } from '@trejgun/material-ui-icons-google'
import { Link as Scroll } from 'react-scroll';
import { useHistory, Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#191970',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '2.5rem',
  },
  goDown: {
    color: '#191970',
    fontSize: '4rem',
  },
  button: {
    margin: theme.spacing(1),
    background: '#fff'
  },
  icon1: {
    marginRight: theme.spacing(1)
  },
  txts: {
    color: "#fff"
  },
  link: {
    color: '#000'
  }
}));
export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  const responseGoogleonSuccess=(response)=>{
    //console.log("response : -",response.profileObj.email)
    //console.log("response : -",response.profileObj.name)
    axios.get(`http://localhost:4000/doctor/${response.profileObj.email}`).then(res=>{
      if(res.data){
        localStorage.setItem("useremail",response.profileObj.email)
        localStorage.setItem("username",res.data.name)
        localStorage.setItem("userid",res.data._id)
        history.push(`/drview/${res.data._id}`)
      }
      else{
        alert("not register doctor")
      }
    })
  }

  const responseGoogleonFailure=(response)=>{
    console.log(response)
  }
  
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
          Doctor<span className={classes.colorText}>geniX</span>
          </h1>

        </Toolbar>
        
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            "The presence of <br />
            the <span >Doctor</span> is the  <br/>
            beginning of the cure"
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
          <Box>
          
            <GoogleLogin
                    clientId="922681220910-vlntououmi8oa4sj9nl5m29m64b23qkk.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogleonSuccess}
                    onFailure={responseGoogleonFailure}
                    cookiePolicy={'single_host_origin'}>
                    Doctor Signin with Google
            </GoogleLogin>
          
          <Button 
          variant="outlined"
          className={classes.button} 
          onClick={()=>history.push('/login')}>
          <Account className={classes.icon1} /> Administrator Login
          </Button>
          </Box>
          <Typography className={classes.txts}>Hi Doctor! don't have gmail account ? 
          {/* <Link to='/drLogin' className={classes.link}>Login</Link> Here */}
             <Button  onClick={()=> history.push('/drLogin')}>Login Here</Button> 
          </Typography>
        </div>
      </Collapse>
    </div>
  );
}

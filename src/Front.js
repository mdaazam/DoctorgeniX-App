import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import PlaceToVisit from './components/PlaceToVisit';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/image7.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
export default function Front() {
  const classes = useStyles();
  const history= useHistory()
  const userEmail=localStorage.getItem("useremail")
  const userName=localStorage.getItem("username")
  const userId=localStorage.getItem("userid")
  useEffect(()=>{
    if(userEmail){
        history.push(`/drview/${userId}`)
       console.log("user exists")
    }
    else{
        console.log("user not exists")
    }
},[userEmail])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  );
}

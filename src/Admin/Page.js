import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import { Box, Button, Container, Paper, Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        paddingTop: theme.spacing(5),
        
    },
    icon1:{
       // marginLeft:"20%",
        //transform: "scale(3)",
        color: "#000"
    },
    btn: {
        marginLeft:"25%",
        marginBottom:"8%",
        background: '#2196F3',
        color:'#fff'
    },
    avt: {
        transform: "scale(3)",
        marginLeft:"35%",
        marginTop:"5%",
        marginBottom:"20%",
        background: '#82eefd'
    },  
    add: {
        alignItems: 'center',
        marginLeft:'35%',
        marginBottom:'10%',
        fontSize: 38,
        fontWeight: 700,
        fontFamily: 'Nunito',
        textDecoration: 'underline'
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    logbtn: {
        color: 'black',
        float: 'right',
        transform: "scale(2)",
        marginBottom:'1%',
        marginRight:'1%'
      },
      logtxt: {
        fontSize:13,
        float: 'right',
        marginLeft:'100%',
        marginBottom:'6%'
      },
}))

export default function Page() {
    const classes = useStyles();
    const history = useHistory();
    const islogin = localStorage.getItem("admidlogin")
    useEffect(()=>{
        if(!islogin){
            history.push("/")
        }
    },[islogin])
    const logout=()=>{
        localStorage.clear()
        history.push('/')
    }
    return (
        <Container className={classes.root}>

            <Paper  component={Box} className={classes.ppr} width="60%"  mx="auto" p={4}>
            <PowerSettingsNewIcon className={classes.logbtn} onClick={()=>logout()}/>
            <Typography className={classes.logtxt}>Logout</Typography>

            <Typography  className={classes.add}>Add or Edit</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Avatar className={classes.avt}><GroupAddRoundedIcon className={classes.icon1}/></Avatar> 
                        <Box>
                            <Button className={classes.btn} ><Link to="/adddoctor" className={classes.link}>Add Doctor</Link></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar className={classes.avt}><PeopleOutlineRoundedIcon className={classes.icon1}/></Avatar> 
                         <Box>
                             <Button className={classes.btn} ><Link to="/editdoctor" className={classes.link}>Edit Doctor</Link></Button>
                         </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Avatar className={classes.avt}><GroupAddRoundedIcon className={classes.icon1}/></Avatar> 
                        <Box>
                            <Button className={classes.btn} > <Link to="/addpatient" className={classes.link}>Add Patient</Link></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar className={classes.avt}><PeopleOutlineRoundedIcon className={classes.icon1}/></Avatar> 
                        <Box>
                            <Button className={classes.btn} ><Link to="/editpatient" className={classes.link}>Edit Patient</Link></Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
           
    )
}

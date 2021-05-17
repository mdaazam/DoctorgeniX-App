import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
root:{
    marginTop: "3rem"
},
emailId: {
    marginTop: "1vh"
},
pswd: {
    marginTop: "2rem",
    marginBottom: "3vh"
}

}));


export default function DrLogin(){

    const classes = useStyles();

    const history = useHistory();

    const [user, setUser] = useState({
        "email":'',
        "password":''
    })

    let name,value;
    const handleChange =(e)=> {
        name=e.target.name
        value=e.target.value
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleClick = () => {
        //alert('submit')
        //history.push('/page')
        // if(user.password=="admin"){
            // alert('Login successful')
            // history.push('/page')
          // localStorage.setItem("admidlogin", true)
        // }
        // else{
            // alert('Not matched user')
            // 
        // }
        axios.get(`http://localhost:4000/doctor/${user.email}`).then(res=>{
            if(res.data){
            //   localStorage.setItem("useremail",user.email)
            //   localStorage.setItem("username",res.data.name)
            //   localStorage.setItem("userid",res.data._id)
            //   history.push(`/drview/${res.data._id}`)
                if(user.password==res.data.password){
                    localStorage.setItem("useremail",user.email)
                    localStorage.setItem("username",res.data.name)
                    localStorage.setItem("userid",res.data._id)
                    history.push(`/drview/${res.data._id}`)
                }
                else{
                    alert("Password not match")
                }
            }
            else{
              alert("not register doctor")
            }
        })
    }


    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <ArrowBackIcon onClick={()=>history.push('/')}/>
                <Grid align='center' className={classes.root}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField label='Email' className={classes.emailId} placeholder='Enter Email id' value={user.email} name="email" onChange={handleChange} type="email" fullWidth required/>
                <TextField label='Password' className={classes.pswd} placeholder='Enter password' value={user.password} name="password" onChange={handleChange} type='password' fullWidth required/>
                <Button type='button' onClick={()=>handleClick()} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography>
                    <Link to="/fpwd">
                        Forgot Password ?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

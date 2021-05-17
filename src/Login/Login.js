import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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


export default function Login(){

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
        if(user.password=="admin"){
            alert('Login successful')
            history.push('/page')
            localStorage.setItem("admidlogin", true)
        }
        else{
            alert('Not matched user')
            
        }
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
                    <h2>Admin</h2>
                </Grid>
                {/*<TextField label='Email' className={classes.emailId} placeholder='Enter Email id'name="email" onChange={handleChange} type="email" fullWidth required/>*/}
                <TextField label='Password' className={classes.pswd} placeholder='Enter password'name="password" onChange={handleChange} type='password' fullWidth required/>
                <Button type='button' onClick={handleClick} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </Paper>
        </Grid>
    )
}

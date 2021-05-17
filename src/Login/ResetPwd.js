import React, { useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
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


export default function ResetPwd(props) {
    const {drID} = props

    const classes = useStyles();

    const history = useHistory();

    const [user, setUser] = useState({
        "password":'',
        "cpassword":''
    })
    let param=new URLSearchParams(); 

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
        axios.get(`http://localhost:4000/eachDoctor/${drID}`).then(res=>{
            if(user.password==res.data.password){
                if(user.password!=user.cpassword){
                    param.append("password", user.cpassword);
                    axios.put(`http://localhost:4000/editdoctorpassword/${drID}`, param,{
                    headers:{
                        'content-Type': 'application/x-www-form-urlencoded'
                    }
                    }).then(res=>{
                        localStorage.clear()
                        alert("Reset Successfully")
                        console.log("ok")
                        history.push("/")
                    })
                }
                else{
                    alert("Old password and new password same")
                }
            }
            else{
                alert("Old password mismatch")
            }
        })
    }


    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                <ArrowBackIcon onClick={()=>history.goBack()}/>
                    <Grid align='center' className={classes.root}>
                         <Avatar style={avatarStyle}><VpnKeyOutlinedIcon/></Avatar>
                        <h5>Reset Your Password?</h5>
                    </Grid>
                    <TextField label='Old Password' className={classes.pswd} placeholder='Enter password' value={user.password} name="password" onChange={handleChange} type='password' fullWidth required/>
                    <TextField label='New Password' className={classes.pswd} placeholder='Enter password' value={user.cpassword} name="cpassword" onChange={handleChange} type='text' fullWidth required/>
                    <Button type='button' onClick={handleClick} color='primary' variant="contained" style={btnstyle} fullWidth> Reset</Button>
                </Paper>
            </Grid>
        
        </div>
    )
}

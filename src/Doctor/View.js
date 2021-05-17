import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Paper, TextField, Accordion, AccordionSummary, AccordionDetails, Input } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import axios from 'axios';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "50vh",
        paddingTop: theme.spacing(5),
        
    },
    pateint: {
        marginLeft:"10%",
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginLeft: "20%",
        width:'60%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
      },
      txt: {
          fontSize: 16,
          fontWeight: "bold"
      },
      logtxt: {
        fontSize:13,
        float: 'right',
        marginLeft:'100%',
        marginBottom:'6%'
      },
      logbtn: {
        color: 'black',
        float: 'right',
        transform: "scale(2)",
        marginBottom:'1%',
        marginRight:'0.8%'
      },
      pdf:{
        transform: "scale(2)",
        color: "blue"
      },
      dailypdf:{
        color: "blue",
        transform: "scale(2)",
        marginLeft: "37px"
      },
      editdaily:{
        marginLeft: "37px"
      },
      
}))

export default function View(props) {
    const classes = useStyles();
    const history = useHistory();
    const {currentdate,patientid} = props
    const [patient,setpatient] = useState({})
    const [daywisedetails,setdaywisedetails] =useState([])
    const [update,setupdate]= useState({
      heartRate:"",
      oxygenLevel:"",
      bloodPressure:"",
      bodyTemp:"",
      rapidCoronaTest:"",
      medicine:"",
      suggestion:""
    })
    var param=new URLSearchParams();
    localStorage.setItem("patientid" , patientid)
    const userEmail=localStorage.getItem("useremail")
    const userId=localStorage.getItem("userid")
    useEffect(()=>{
      if(!userEmail){
          history.push("/")
         console.log("user exists")
      }
    },[userEmail])

    useEffect(()=>{
      axios.get(`http://localhost:4000/patient/${patientid}`).then(res=>{
        setpatient(res.data)
      })
    },[])

    useEffect(()=>{
      axios.get(`http://localhost:4000/dailypatientdetails/${patientid}`).then(res=>{
        setdaywisedetails(res.data)
      })
    },[])
    const logout=()=>{
      localStorage.clear()
      history.push("/")
    }
    let name, value
    const updatechange=(e)=>{
      name=e.target.name
      value=e.target.value
      setupdate({
        ...update,
        [name] : value
      })
    }
    const updateclick=()=>{
      param.append("patientid", patientid);
      param.append("comments", update.suggestion);
      param.append("medicines", update.medicine); 
      param.append("date", currentdate);

      param.append("heartRate", update.heartRate);
      param.append("oxygenLevel", update.oxygenLevel);
      param.append("bloodPressure", update.bloodPressure); 
      param.append("bodyTemp", update.bodyTemp);
      param.append("rapidCoronaTest", update.rapidCoronaTest);
      
      
      axios.post("http://localhost:4000/adddailyPatient", param,{
        headers:{
            'content-Type': 'application/x-www-form-urlencoded'
        }
        }).then(res=>{
        
          axios.get(`http://localhost:4000/dailypatientdetails/${patientid}`).then(res=>{
          setdaywisedetails(res.data)
          })
        })
        setupdate({
          medicine:"",
          suggestion:"",
          heartRate:"",
          oxygenLevel:"",
          bloodPressure:"",
          bodyTemp:"",
          rapidCoronaTest:"",
        })
        param=new URLSearchParams();
    }
    console.log(currentdate)
    return (
        <Container className={classes.root}>
            <Paper component={Box} width="100%"  mx="auto"  p={4}>
            <PowerSettingsNewIcon className={classes.logbtn} onClick={()=>logout()}/>
            <Typography className={classes.logtxt}>Logout</Typography>
            <ArrowBackIcon onClick={()=>history.goBack()}/>
            <Typography variant='h4' align="center">Pateint Details</Typography>
                <Box component="form" mt={2} className={classes.pateint}>
                    <Typography variant="h5" >Patient Name : {patient.name}</Typography>
                    <PictureAsPdfIcon className={classes.pdf} onClick={()=>history.push(`/printpdf/${patientid}`)}/>
                </Box>
                <Paper component={Box} width="100%" mx="auto" p={4} mt={2}>
                     <Box component="form">
                         <Typography className={classes.txt} label="Heart Rate" margin="normal" fullWidth>Heart Rate : {patient.heartRate}Bpm</Typography>
                         <Typography className={classes.txt} label="SpO2 Level" margin="normal" fullWidth>SpO2 Level : {patient.oxygenLevel}</Typography>
                         <Typography className={classes.txt} label="Blood Pressure" margin="normal" fullWidth>Blood Pressure : {patient.bloodPressure}</Typography>
                         <Typography className={classes.txt} label="Temperature" margin="normal" fullWidth>Temperature : {patient.bodyTemp}°F</Typography>
                         <Typography className={classes.txt} label="RCT" margin="normal" fullWidth>RCT : {patient.rapidCoronaTest}</Typography>
                         <Typography className={classes.txt} label="Reason" margin="normal" fullWidth>Reason : {patient.reasonForappointment}</Typography>
                         <Button variant="contained"  color="primary" onClick={()=>history.push(`/updatevitals/${patientid}`)}>edit</Button>

                         <TextField type="number" id="standard-number" InputLabelProps={{shrink: true}} label="heartRate" margin="normal" fullWidth  name="heartRate" value={update.heartRate} onChange={updatechange}/>
                         <TextField type="number" id="standard-number" InputLabelProps={{shrink: true}} label="oxygenLevel" margin="normal" fullWidth  name="oxygenLevel" value={update.oxygenLevel} onChange={updatechange}/>
                         <TextField type="number" id="standard-number" InputLabelProps={{shrink: true}} label="bloodPressure" margin="normal" fullWidth  name="bloodPressure" value={update.bloodPressure} onChange={updatechange}/>
                         <TextField type="number" id="standard-number" InputLabelProps={{shrink: true}} label="bodyTemp" margin="normal" fullWidth  name="bodyTemp" value={update.bodyTemp} onChange={updatechange}/>
                         <TextField label="rapidCoronaTest" margin="normal" fullWidth  name="rapidCoronaTest" value={update.rapidCoronaTest} onChange={updatechange}/>
                         <TextField label="Medicines" margin="normal" fullWidth multiline name="medicine" value={update.medicine} onChange={updatechange}/>
                         <TextField label="Suggestion" margin="normal" fullWidth multiline name="suggestion" value={update.suggestion} onChange={updatechange}/>
                     </Box>
                </Paper>
                <Box mt={2} className={classes.btn}>
                    <Button variant="contained"  color="primary" fullWidth onClick={()=>updateclick()}>Add daily vitals</Button>
                </Box>
                <Box mt={3}>
                    {daywisedetails.map(item=>
                      
                      <Accordion>
                       <AccordionSummary
                         expandIcon={<ExpandMoreIcon />}
                         aria-controls="panel1a-content"
                         id="panel1a-header"
                       >
                         <Typography className={classes.heading}>{item?.date}</Typography>
                       </AccordionSummary>
                       <AccordionDetails>
                       
                       <div>
                        <div>
                          <ul>
                          <li>
                            <Typography>
                            heartRate :- {item?.heartRate}Bpm
                              </Typography>
                            </li>
                            <li>
                            <Typography>
                            oxygenLevel :- {item?.oxygenLevel}
                              </Typography>
                            </li>
                            <li>
                            <Typography>
                            bloodPressure :- {item?.bloodPressure}
                              </Typography>
                            </li>
                            <li>
                            <Typography>
                            bodyTemp :- {item?.bodyTemp}°F
                              </Typography>
                            </li>
                            <li>
                            <Typography>
                            rapidCoronaTest :- {item?.rapidCoronaTest}
                              </Typography>
                            </li>
                            <li>
                            <Typography>
                              Medicines :- {item?.medicines}
                              </Typography>
                            </li>


                            <li>
                            <Typography>
                            Suggestion :- {item?.comments}
                            </Typography>
                            </li>
                          </ul>
                          <PictureAsPdfIcon className={classes.dailypdf} onClick={()=>history.push(`/eachdaypdf/${item?._id}`)}/>
                          <Button variant="contained"  color="primary" className={classes.editdaily} onClick={()=>history.push(`/eachdayeditdetails/${item?._id}`)}>Edit daily details</Button>
                        </div>
                         
                       </div>
                       </AccordionDetails>
                      </Accordion>
                      
                    )}
                    
                </Box>
            </Paper>
        </Container>
    )
}

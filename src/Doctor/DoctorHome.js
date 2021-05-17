import React, { useEffect, useState } from 'react';
import { Container, Paper, Box, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination, Button, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
  maxWidth:'80vw',
    height: "100vh",
    paddingTop: theme.spacing(5),
    justifyContent: "center",
    alignItems: "center"
  },
  ppr: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  ppt:{
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem"
  },
  srch: {
    width:'100%',
    height:'1',
    marginBottom: "5%"
  },
  typ: {
    display: 'flex',
    justifyContent: 'space-between',
    
    marginBottom: "3%",
    marginTop: "10%"
  },
  logbtn: {
    color: 'black',
    float: 'right',
    transform: "scale(2)",
    marginBottom:'1%',
    marginRight: '0.8%'
  },
  logtxt: {
    fontSize:13,
    float: 'right',
    marginLeft:'100%',
    marginBottom:'6%'
  },
  datee: {
    float: 'right'
  },
  reset: {
    color: 'red'
  }
}))

export default function DoctorHome(props) {
  const history =useHistory();
  const classes = useStyles();
  const [users, setUsers]=useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [date, changeDate] = useState(new Date());
  const [daypatient,setdaypatient]=useState([]);
  const [searchpatientlist,setsearchpatientlist]=useState([])
  const [searchpatient,setsearchpatient]=useState("")
  const profilename=localStorage.getItem("username");
  
  const userEmail=localStorage.getItem("useremail")
  const userId=localStorage.getItem("userid")
  useEffect(()=>{
    if(!userEmail){
        history.push("/")
       console.log("user exists")
    }
},[userEmail])

  useEffect(()=>{
    axios.get(`http://localhost:4000/selectedpatient/${props.profileid}`).then(res=>{
      setUsers(res.data)
    })
  }, []);
  useEffect(()=>{
    let patients=users.filter(item=>item.date.includes(date))
    setdaypatient(patients)
    
  },[date])

  useEffect(()=>{
    setsearchpatientlist(daypatient) 
  },[daypatient])
  useEffect(()=>{
    if(searchpatient==""){
      setsearchpatientlist(daypatient)
    }
    else{
      let patients=daypatient.filter(item=>item.name.includes(searchpatient))
    setsearchpatientlist(patients)
    }
     
  },[searchpatient])

  const onChangePage = (e, nextPage) => {
    setPage(nextPage)
  };

  const onChangeRowsPerPage =(e) => {
    setRowsPerPage(e.target.value)
  }

  const handleSearch = (e) => {
      setsearchpatient(e.target.value)
  }
  const logout=()=>{
    localStorage.clear()
    history.push("/")
  }
  const handledatechange=(e)=>{
    changeDate(e.target.value)
  }
  
  console.log(searchpatientlist)
  return (
    <Container className={classes.root}>
    <Paper component={Box} width="90%"  mx="auto" p={5}>
    <Button className={classes.reset} onClick={()=>history.push(`/reset/${props.profileid}`)}>Reset Password</Button>
    
    <PowerSettingsNewIcon className={classes.logbtn} onClick={()=>logout()}/>
    <Typography className={classes.logtxt}>Logout</Typography>
    
    <Box className={classes.typ}>
    <Typography variant="h5">Dr.&nbsp;{profilename} </Typography>
    </Box>
    <TextField className={classes.datee} type="date" value={date} onChange={handledatechange}/>
    <TextField
    className={classes.srch}
     label="Search"
     size="small"
    variant="outlined" 
    margin="normal" 
    InputProps={
      {endAdornment:(<InputAdornment position="end"><SearchIcon/></InputAdornment>)}
      }
      onChange={handleSearch}
      />

      <TableContainer component={Paper} width='100%' className={classes.ppr}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.ppt}>Patient Name </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            searchpatientlist.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map(user => (
              <TableRow>
                 <TableCell onClick={()=>history.push(`/view/${user?._id}`)} className={classes.ppr}>{user.name}</TableCell>
               </TableRow>
               
            ))
            
          }
          </TableBody>
        </Table>
      </TableContainer>
      <Paper>
        <TablePagination className={classes.ppr}
          rowsPerPageOptions={[1,3,5,10,15,25,50]}
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage} />
      </Paper>
      </Paper>
    </Container>
  )
}

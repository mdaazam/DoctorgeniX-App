import React, { useEffect, useState } from 'react';
import Front from './Front';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from './Login/Login';
import Page from './Admin/Page';
import View from './Doctor/View';
import DoctorHome from './Doctor/DoctorHome';
import AddDoctor from './Admin/AddDoctor/AddDoctor';
import Editdoctor from './Admin/AddDoctor/Editdoctor';
import AddPatient from './Admin/AddPatient/AddPatient';
import Editpatient from './Admin/AddPatient/Editpatient';
import PrintPdf from './Doctor/PrintPdf';
import Updatevitals from './Doctor/Updatevitals';
import Eachdaypdf from './Doctor/Eachdaypdf';
import Editdailypatientdetails from './Doctor/Editdailypatientdetails';
import DrLogin from './Login/DrLogin';
import DrForgotPwd from './Login/DrForgotPwd';
import ResetPwd from './Login/ResetPwd';

export default function App() {
    const [currentdate,setcurrentdate]= useState("")
    useEffect(()=>{
      var date= new Date();
      var dates=""
      var d=(date.getMonth()+1).toString()
      if(d.length==1){
         dates=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate()
      }
      else{
         dates=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
      }
      setcurrentdate(dates)
    },[])
    console.log("patient date= ",currentdate)
    return (
        <div>
            <BrowserRouter>
                <Switch>
                <Route exact path="/" component={()=><Front/>}/>
                <Route exact path="/login" component={()=><Login/>}/>
                <Route exact path="/drLogin" component={()=><DrLogin />} />
                <Route exact path="/fpwd" component={()=><DrForgotPwd />} /> 
                <Route exact path="/reset/:id" component={(props)=><ResetPwd drID={props.match.params.id}/>} />
                <Route exact path="/page" component={()=><Page/>}/>
                <Route exact path="/view/:id" component={(props)=><View currentdate={currentdate} patientid={props.match.params.id}/>}/> 
                
                <Route exact path="/drview/:id" component={(props)=><DoctorHome profileid={props.match.params.id}/>}/>
                <Route exact path="/updatevitals/:patientid" component={(props)=><Updatevitals patientid={props.match.params.patientid}/>}/>
                <Route exact path="/adddoctor" component={()=><AddDoctor/>}/> 
                <Route exact path="/editdoctor" component={()=><Editdoctor/>}/>
                <Route exact path="/addpatient" component={()=><AddPatient/>}/>
                <Route exact path="/editpatient" component={()=><Editpatient/>}/>
                <Route exact path="/printpdf/:id" component={(props)=><PrintPdf patientid={props.match.params.id}/>}/>
                <Route exact path="/eachdaypdf/:id" component={(props)=><Eachdaypdf eachdaypatientid={props.match.params.id}/>}/>
                <Route exact path="/eachdayeditdetails/:id" component={(props)=><Editdailypatientdetails eachdaypatientid={props.match.params.id}/>}/>
                </Switch>
            </BrowserRouter> 
        </div>
    )
}
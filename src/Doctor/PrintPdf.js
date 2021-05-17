import  React, { useEffect, useState } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import axios from "axios";
import './PrintPdf.css';
import {
  
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

import { useHistory } from "react-router";

const PrintPdf = (props) => {
  const history=useHistory()
  const pdfExportComponent = React.useRef(null);
  const {patientid}=props
  const [patient,setpatient]=useState({})
  const [patientd,setpatientd]=useState([])
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
      setpatientd(res.data)
    })
  },[])
  return (
    <div className="container">
      <div className="example-config">
        <button
          className="k-button"
          style={{float: "right",marginTop:"2%" , transform: "scale(2)"}}
          onClick={() => {
            if (pdfExportComponent.current) {
              pdfExportComponent.current.save();
            }
          }}
        >
          <PictureAsPdfIcon/>
        </button>
      </div>

      <PDFExport paperSize="A4" margin="2cm" ref={pdfExportComponent}>
        <div style={{marginTop: "6%"}}>
          <center><h3>Pateint Details</h3></center> <br/><br/>
         
          <Card className="card" style={{ width: '18rem' }}>
  
  
  <Card.Body>
    <Card.Title> {patient.name}</Card.Title>
    <Card.Text>
      Daily Vitals & Report card
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Pateint Age: {patient.age}Yr</ListGroupItem>
    <ListGroupItem>Heart Rate: {patient.heartRate}BPM</ListGroupItem>
    <ListGroupItem>SpO2 Level: {patient.oxygenLevel}</ListGroupItem>
    <ListGroupItem>Blood Pressure: {patient.bloodPressure}</ListGroupItem>
    <ListGroupItem>Temperature: {patient.bodyTemp}°F</ListGroupItem>
    <ListGroupItem>RCT: {patient.rapidCoronaTest}</ListGroupItem>
    <ListGroupItem>Reason: {patient.reasonForappointment}</ListGroupItem>
  </ListGroup>
 
</Card>



          <hr/>
          {patientd.map(item=>
            <div>
              <h5>Date: {item?.date}</h5><br/>
            <p>Medicines : {item?.medicines}</p>
            <p>Suggestions : {item?.comments}</p>
            <p>heartRate : {item?.heartRate}Bpm</p>
            <p>oxygenLevel : {item?.oxygenLevel}</p>
            <p>bloodPressure : {item?.bloodPressure}</p>
            <p>bodyTemp : {item?.bodyTemp}°F</p>
            <p>rapidCoronaTest : {item?.rapidCoronaTest}</p>
            
            </div>
            )}


        </div>

      </PDFExport>
    </div>
  )
}

export default PrintPdf;
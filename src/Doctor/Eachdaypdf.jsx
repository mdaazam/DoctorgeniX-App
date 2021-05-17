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

export default function Eachdaypdf(props) {
    const {eachdaypatientid} = props
    const pdfExportComponent = React.useRef(null);
    const patientid = localStorage.getItem("patientid")
    const [patient,setpatient] = useState({})
    const [eachdaypatient,seteachdaypatient] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:4000/patient/${patientid}`).then(res=>{
          setpatient(res.data)
        })
      },[])
      useEffect(()=>{
        axios.get(`http://localhost:4000/eachdaypatient/${eachdaypatientid}`).then(res=>{
            seteachdaypatient(res.data)
        })
      },[])
      console.log(patient)
      console.log(eachdaypatient)
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
          
            <div>
              <h5>Date: {eachdaypatient?.date}</h5><br/>
            <p>Medicines : {eachdaypatient?.medicines}</p>
            <p>Suggestions : {eachdaypatient?.comments}</p>
            <p>heartRate : {eachdaypatient?.heartRate}</p>
            <p>oxygenLevel : {eachdaypatient?.oxygenLevel}</p>
            <p>bloodPressure : {eachdaypatient?.bloodPressure}</p>
            <p>bodyTemp : {eachdaypatient?.bodyTemp}</p>
            <p>rapidCoronaTest : {eachdaypatient?.rapidCoronaTest}</p>
            </div>
            

        </div>

      </PDFExport>
    </div>
    )
}

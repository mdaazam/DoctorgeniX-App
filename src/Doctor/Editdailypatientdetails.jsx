import React,{useEffect, useState} from 'react';
import './AddPatient.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Editdailypatientdetails(props) {
    const {eachdaypatientid} = props
    const history= useHistory()
    const [patient, setPatient] = useState({})
    // const [doc,setdoc]= useState([])
    const param=new URLSearchParams();
    useEffect(()=>{
        axios.get(`http://localhost:4000/eachdaypatient/${eachdaypatientid}`).then(res=>{
          setPatient(res.data)
        })
      },[])
    // useEffect(()=>{
    //     axios.get("http://localhost:4000/doctorlist").then(res=>{
    //         setdoc(res.data)
    //     })
    // },[])
console.log(patient)
    let name, value
    const handlePatientInput = (e) =>{
        name = e.target.name
        value = e.target.value
        setPatient({
            ...patient,
            [name]:value
        })
        console.log(patient)
    }
    
    const handleSubmit=()=>{
               
        param.append("reasonForappointment", patient.reasonForappointment);
        param.append("heartRate", patient.heartRate);
        param.append("oxygenLevel", patient.oxygenLevel);
        param.append("bloodPressure", patient.bloodPressure);
        param.append("bodyTemp", patient.bodyTemp);
        param.append("rapidCoronaTest", patient.rapidCoronaTest);
        param.append("comments", patient.comments);
        param.append("medicines", patient.medicines);
        param.append("date", patient.date);
        param.append("patientid", patient.patientid);
        
        axios.put(`http://localhost:4000/editdailypatientdetails/${eachdaypatientid}`, param,{
            headers:{
                'content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log("ok")  
            setPatient({
            
                "heartRate":"",
                "oxygenLevel":"",
                "bloodPressure":"",
                "bodyTemp":"",
                "rapidCoronaTest":"",
                "comments":"",
                "medicines":""
            })
        })
        history.goBack()
    }
    return (
        <section className="heading">

            <ArrowBackIcon onClick={()=>history.goBack()}/>
            

            <h1 className="title">Edit Patient</h1>

            <div className="container">
                <div className="add-doc-form row">
                                    
                    <div className="form-field col-lg-12">
                        <input type="number" id="reg" className="input-text" name="heartRate" value={patient.heartRate} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Heart Rate :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="number" id="reg" className="input-text" name="oxygenLevel" value={patient.oxygenLevel} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Oxygen Level :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="number" id="reg" className="input-text" name="bloodPressure" value={patient.bloodPressure} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Blood Pressure :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="number" id="special" className="input-text" name="bodyTemp" value={patient.bodyTemp} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Body Temperature :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="special" className="input-text" name="rapidCoronaTest" value={patient.rapidCoronaTest} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Rapid Corona Test :</label>
                    </div>

                    <div className="form-field col-lg-12">
                        <input type="text" id="special" className="input-text" name="comments" value={patient.comments} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Doctor Suggestions :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="special" className="input-text" name="medicines" value={patient.medicines} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Medicine :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="submit" class="submit-btn" value ="Edit" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

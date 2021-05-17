import React,{useEffect, useState} from 'react';
import './AddPatient.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';



const AddPatient = () => {
    
    const history = useHistory();
    const [doc,setdoc]= useState([])
    const [patient, setPatient] = useState({
        "name":"",
        "age":"",
        "date":new Date(),
        "doctorid":"",
        "reasonForappointment":"",
        "heartRate":"",
        "oxygenLevel":"",
        "bloodPressure":"",
        "bodyTemp":"",
        "rapidCoronaTest":""
    })
    const islogin = localStorage.getItem("admidlogin")
    useEffect(()=>{
        if(!islogin){
            history.push("/")
        }
    },[islogin])
    useEffect(()=>{
        axios.get("http://localhost:4000/doctorlist").then(res=>{
            setdoc(res.data)
        })
    },[])
    console.log(doc)
    
    let name,value
    const handlePatientInput = (e) =>{
        name = e.target.name
        value = e.target.value
        setPatient({
            ...patient,
            [name]:value
        })
        console.log(patient)
    }
    const handledatechange=(e)=>{
        setPatient({
            ...patient,
            date: e.target.value
        })
    }
    console.log(patient.date)
    console.log(typeof(patient.date))

  const param=new URLSearchParams();

  const handleSubmit=(e)=>{
    if((!patient.name) || (!patient.age) || (!patient.date) ||(!patient.doctorid) || (!patient.reasonForappointment) || (!patient.heartRate) || (!patient.oxygenLevel) || (!patient.bloodPressure) || (!patient.bodyTemp) || (!patient.rapidCoronaTest)){
        alert("please fill the details properly")
        return
      }
    e.preventDefault();
   param.append("name", patient.name); 
   param.append("age", patient.age);
   param.append("date", patient.date);
   param.append("doctorid", patient.doctorid);
   param.append("reasonForappointment", patient.reasonForappointment);
   param.append("heartRate", patient.heartRate);
   param.append("oxygenLevel", patient.oxygenLevel);
   param.append("bloodPressure", patient.bloodPressure);
   param.append("bodyTemp", patient.bodyTemp);
   param.append("rapidCoronaTest", patient.rapidCoronaTest);
    axios.post("http://localhost:4000/newpatientadd", param,{
        headers:{
            'content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        window.alert("Successfully Added")
        console.log("ok")  
        setPatient({
            "name":"",
            "age":"",
            "date":"",
            "doctorid":"",
            "reasonForappointment":"",
            "heartRate":"",
            "oxygenLevel":"",
            "bloodPressure":"",
            "bodyTemp":"",
            "rapidCoronaTest":""
        })
    })
    history.push('/page')
}
console.log(patient)
const logout=()=>{
    localStorage.clear()
    history.push('/')
}
    return(
        <section className="heading">

            <ArrowBackIcon onClick={()=>history.push('/page')}/>
            <PowerSettingsNewIcon className="logbtn" onClick={()=>logout()}/>
            <label className="logtxt">Logout</label>

            <h1 className="title">Add Patient</h1>

            <div className="container">
                <div className="add-doc-form row">
                    <div className="form-field col-lg-12">
                        <input type="text" id="name" className="input-text" name="name" value={patient.name} onChange={handlePatientInput}/>
                        <label htmlFor="name" className="label" >Name :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="number" id="reg" className="input-text" name="age" value={patient.age} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label" >Age :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="date" id="reg" className="input-text" name="date" value={patient.date} onChange={handledatechange}/>
                        <label htmlFor="reg" className="label" >Date :</label>
                    </div>
                    <div className="form-field col-lg-12">
                    
                    <select className="choose-doc" name="doctorid" value={patient.doctorid} onChange={handlePatientInput}>
                            <option class="input-choice">Select doctor</option>
                            {doc.map(item=><option class="input-choice" value={item?._id}>Dr. {item?.name}</option>)}
                            
                        </select>
                        <label htmlFor="patientid" className="label-doctor">Doctor Appointed :</label>
                    </div>
                    <div className="form-field col-lg-12">
                    <textarea className="input-comments" comments rows="10" name="reasonForappointment" value={patient.reasonForappointment} onChange={handlePatientInput}></textarea>
                        <label htmlFor="problems" className="label-comments" >Reason for Appointment :</label>
                    </div>
                  
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
                        <input type="submit" class="submit-btn" value ="Add" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </section>
    

    )
}

export default AddPatient;
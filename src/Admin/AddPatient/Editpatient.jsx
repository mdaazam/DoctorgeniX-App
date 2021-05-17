import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';



export default function Editpatient() {
    const history = useHistory();
    const [patientlist,setpatientlist]= useState([])
    const [doc,setdoc]= useState([])
    const [patient, setPatient] = useState({})
    const [patientid,setpatientid]=useState({
        patientID: ''
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
    useEffect(()=>{
        axios.get("http://localhost:4000/patientlist").then(res=>{
            setpatientlist(res.data)
        })
    },[])
    console.log(doc)
    console.log(patientlist)

    useEffect(()=>{
        axios.get(`http://localhost:4000/patient/${patientid.patientID}`).then(res=>{
          setPatient(res.data)
        })
      },[patientid])

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
    const handlePatientID=(e)=>{
        name = e.target.name
        value = e.target.value
        setpatientid({
            [name] : value
        })
    }
    console.log(patientid.patientID)

  const param=new URLSearchParams();

  const handleSubmit=(e)=>{
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
    axios.put(`http://localhost:4000/editpatient/${patientid.patientID}`, param,{
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

            <h1 className="title">Edit Patient</h1>

            <div className="container">
                <div className="add-doc-form row">
                    <div className="form-field col-lg-6">

                        <select className="choose-doc" name="patientID" value={patientid.patientID} onChange={handlePatientID}>
                            <option class="input-choice">Select patient</option>
                            {patientlist.map(item=><option class="input-choice" value={item?._id}>{item?.name}</option>)}

                        </select>
                        <label htmlFor="patientid" className="label-doctor">Select patient :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="name" className="input-text" name="name" value={patient.name} onChange={handlePatientInput}/>
                        <label htmlFor="name" className="label" >Name :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="reg" className="input-text" name="age" value={patient.age} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label" >Age :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="date" id="reg" className="input-text" name="date" value={patient.date} onChange={handledatechange}/>
                        <label htmlFor="reg" className="label" >Date :</label>
                    </div>
                    <div className="form-field col-lg-12">
                    
                        <select className="choose-doc" name="doctorid" value={patient.doctorid} onChange={handlePatientInput}>
                            <option class="input-choice">Select doctor</option>
                            {doc.map(item=><option class="input-choice" value={item?._id}>{item?.name}</option>)}
                            
                        </select>
                        <label htmlFor="patientid" className="label-doctor">Doctor Appointed :</label>
                    </div>
                    <div className="form-field col-lg-12">
                    <textarea className="input-comments" comments rows="10" name="reasonForappointment" value={patient.reasonForappointment} onChange={handlePatientInput}></textarea>
                        <label htmlFor="problems" className="label-comments" >Reason for Appointment :</label>
                    </div>
                  
                    <div className="form-field col-lg-12">
                        <input type="text" id="reg" className="input-text" name="heartRate" value={patient.heartRate} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Heart Rate :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="reg" className="input-text" name="oxygenLevel" value={patient.oxygenLevel} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Oxygen Level :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="reg" className="input-text" name="bloodPressure" value={patient.bloodPressure} onChange={handlePatientInput}/>
                        <label htmlFor="reg" className="label">Blood Pressure :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="special" className="input-text" name="bodyTemp" value={patient.bodyTemp} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Body Temperature :</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input type="text" id="special" className="input-text" name="rapidCoronaTest" value={patient.rapidCoronaTest} onChange={handlePatientInput}/>
                        <label htmlFor="patientid" className="label">Rapid Corona Test :</label>
                    </div>
                    

                    <div className="form-field col-lg-12">
                        <input type="submit" class="submit-btn" value ="Edit" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </section>
    

    )
}


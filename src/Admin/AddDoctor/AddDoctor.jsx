import React,{useState,useEffect} from 'react';
import './AddDoc.css';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import validator from 'validator'


const AddDoctor = () => {
    const history = useHistory();
const[doctor,setDoctor] = useState({
"name":"",
"registrationId":"",
"email":"",
"password":"",
"specialist":"",
})
const [dbdoctor, setDbdoctor] = useState([])
const islogin = localStorage.getItem("admidlogin")
    useEffect(()=>{
        if(!islogin){
            history.push("/")
        }
    },[islogin])
useEffect(()=>{
    axios.get("https://quiet-springs-42138.herokuapp.com/doctorlist").then(res=>{
        setDbdoctor(res.data)
        console.log(res.data)
    })
    
},[])
console.log(dbdoctor)
let name,value
const handleDocInput = (e)=>{
name = e.target.name
value = e.target.value
setDoctor({
...doctor,
[name]:value
})
console.log(doctor)
}
console.log(doctor.email)
console.log(dbdoctor.email)
let param=new URLSearchParams();
const handleSubmit=()=>{
    if((!doctor.name) || (!doctor.registrationId) || (!doctor.email) || (!doctor.specialist)){
        alert("Please fill all the fields")
        return
    }
    if(!validator.isEmail(doctor.email)){
        alert("email must be a valid mail")
        return
    }

    axios.get(`http://localhost:4000/doctor/${doctor.email}`).then(res=>{
        if(res.data){
            window.alert("already reg")
        }
        
    else{
        param.append("name", doctor.name);
        param.append("registrationId", doctor.registrationId);
        param.append("email", doctor.email);
        param.append("password", doctor.password);
        param.append("specialist", doctor.specialist);
        axios.post("http://localhost:4000/newDoctor", param,{
        headers:{
        'content-Type': 'application/x-www-form-urlencoded'
        }
        }).then(res=>{
        console.log("added")
        setDoctor({
            name:"",
            registrationId:"",
            email:"",
            password:"",
            specialist:"",
        })
    })
    }
})
history.push("/page")
}
const logout=()=>{
    localStorage.clear()
    history.push('/')
}

return(

        <section className="heading">
        <ArrowBackIcon onClick={()=>history.push('/page')}/>
        <PowerSettingsNewIcon className="logbtn" onClick={()=>logout()}/>
        <label className="logtxt">Logout</label>
        <h1 className="title">Add Doctor</h1>

        <div className="container">
        <div className="add-doc-form row">
        <div className="form-field col-lg-12">
        <input type="text" id="name" className="input-text" name="name" value={doctor.name} onChange={handleDocInput}/>
        <label htmlFor="name" className="label">Name :</label>
        </div>
        <div className="form-field col-lg-12">
        <input type="text" id="reg" className="input-text" name="registrationId" value={doctor.registrationId} onChange={handleDocInput}/>
        <label htmlFor="reg" className="label">Registration Id :</label>
        </div>
        <div className="form-field col-lg-12">
        <input type="email" id="email" className="input-text" name="email" value={doctor.email} onChange={handleDocInput}/>
        <label htmlFor="email" className="label">Email :</label>
        </div>
        <div className="form-field col-lg-12">
        <input type="password" id="password" className="input-text" name="password" value={doctor.password} onChange={handleDocInput}/>
        <label htmlFor="password" className="label">Password :</label>
        </div>
        <div className="form-field col-lg-12">
        <input type="text" id="special" className="input-text" name="specialist" value={doctor.specialist} onChange={handleDocInput}/>
        <label htmlFor="special" className="label">Specialization :</label>
        </div>

        <div className="form-field col-lg-12">
        <input type="submit" class="submit-btn" value ="Add" onClick={handleSubmit}/>
        </div>
        </div>
        </div>
        </section>


)
} 



export default AddDoctor;
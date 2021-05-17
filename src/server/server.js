const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors=require("cors");
const bodyparser=require("body-parser");
const nodemailer = require('nodemailer');


app.use(bodyparser.urlencoded({
    extended : true
}))
app.use(bodyparser.json())
app.use(cors());

const db = "mongodb+srv://admin:admin@cluster0.oavys.mongodb.net/vitaltracker?retryWrites=true&w=majority"

mongoose.connect(db,
    { useNewUrlParser: true ,
     useUnifiedTopology: true }).then(()=>{
    console.log("CONNECTED")
}).catch((err)=> console.log("NOT CONNECTED"))

const doctorSchema = new mongoose.Schema({
    "name":"",
    "registrationId":"",
    "email":"",
    "password":"",
    "specialist":"",
    
})

const Doctor = mongoose.model("Doctors",doctorSchema)

app.post('/newDoctor',(req,res)=>{
    const doctor=new Doctor({
        name: req.body.name,
        registrationId: req.body.registrationId,
        email:req.body.email,
        password: req.body.password,
        specialist:req.body.specialist,
    })
    doctor.save().then(data=>{
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 25,
            auth: {
                user: "indusnet.projectgroup1@gmail.com",// your actual email
                pass: "projectgroup1"        // your actual password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: "",
            to: req.body.email,
            bcc: "", // bcc is optional.
            subject:`Message from admin`,
            html: `
            <h2>Hi ${req.body.name} you are registered doctor</h2>
            <p> Signin with your email </p>
            <p>Password :- ${req.body.password} </p>
            <p> This is  an automatically generated email - please do not reply to it. If you have any queries please contact our helpdesk</p>
            <p> Please use this Link to login http://localhost:3000/ </p>`
        }
        //console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.send("error");
            } else {
                //console.log("Message sent: " + response.message);
                res.send("sent");
            }
        });
        res.send(data)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});

app.get('/doctorlist',(req,res)=>{
    Doctor.find().then(doctor=>{
        res.send(doctor)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.get("/eachDoctor/:id", (req,res)=>{
    Doctor.findById(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
})
app.get('/doctor/:email',(req,res)=>{
    Doctor.findOne({"email": req.params.email}).then(doctor=>{
        res.send(doctor)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.put('/editdoctor/:id',(req,res)=>{
    Doctor.findByIdAndUpdate(req.params.id, {
        name :req.body.name,
        registrationId :req.body.registrationId,
        email :req.body.email,
        password: req.body.password,
        specialist :req.body.specialist,
         
    },{new : true}).then(doctor=>{
        res.send(doctor)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.put('/editdoctorpassword/:id',(req,res)=>{
    Doctor.findByIdAndUpdate(req.params.id, {
        
        password: req.body.password
         
    },{new : true}).then(doctor=>{
        res.send(doctor)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});

app.post('/mail', (req, res) =>{
    console.log(req.body.password)
    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: false,
        port: 25,
        auth: {
            user: "indusnet.projectgroup1@gmail.com",// your actual email
            pass: "projectgroup1"        // your actual password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: "",
        to: req.body.email,
        bcc: "", // bcc is optional.
        subject:`Message from admin`,
        html: `
        <h2>Hi ${req.body.name},</h2>
        We've received a request to reset the password for your Doctor Portal account. No changes have been made to your account yet.<br/> You can reset your password by manupulating the given password below.<br/><center><h5>${req.body.password}</h5></center> <br/>If you do not request the new password, please let us know immediately.<br/>--@support.com`
    }
    //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            //console.log("Message sent: " + response.message);
            res.send("sent");
        }
    });

})


const PatientSchema = new mongoose.Schema({
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
const Patient=mongoose.model("Patients" , PatientSchema)
app.post("/newpatientadd" ,(req,res)=>{
    const newpatient=new Patient({
         name :req.body.name,
         age :req.body.age,
         date :req.body.date,
         doctorid :req.body.doctorid,
         reasonForappointment :req.body.reasonForappointment,
         heartRate :req.body.heartRate,
         oxygenLevel :req.body.oxygenLevel,
         bloodPressure :req.body.bloodPressure,
         bodyTemp :req.body.bodyTemp,
         rapidCoronaTest :req.body.rapidCoronaTest 
    })
    newpatient.save().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
})
app.get('/patientlist',(req,res)=>{
    Patient.find().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.get("/selectedpatient/:doctorid", (req,res)=>{
    Patient.find({doctorid : req.params.doctorid}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
})
app.get("/patient/:id", (req,res)=>{
    Patient.findById(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
})
app.put('/editpatient/:id',(req,res)=>{
    Patient.findByIdAndUpdate(req.params.id, {
        name :req.body.name,
         age :req.body.age,
         date :req.body.date,
         doctorid :req.body.doctorid,
         reasonForappointment :req.body.reasonForappointment,
         heartRate :req.body.heartRate,
         oxygenLevel :req.body.oxygenLevel,
         bloodPressure :req.body.bloodPressure,
         bodyTemp :req.body.bodyTemp,
         rapidCoronaTest :req.body.rapidCoronaTest
    },{new : true}).then(patient=>{
        res.send(patient)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});

app.put('/editpatientbydoctor/:id',(req,res)=>{
    Patient.findByIdAndUpdate(req.params.id, {
        name :req.body.name,
         age :req.body.age,
         reasonForappointment :req.body.reasonForappointment,
         heartRate :req.body.heartRate,
         oxygenLevel :req.body.oxygenLevel,
         bloodPressure :req.body.bloodPressure,
         bodyTemp :req.body.bodyTemp,
         rapidCoronaTest :req.body.rapidCoronaTest
    },{new : true}).then(patient=>{
        res.send(patient)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});






const dailyUpdatedPatientSchema = new mongoose.Schema({
    "patientid":"",
    "comments":"",
    "medicines":"",
    "date":"",
    "heartRate":"",
    "oxygenLevel":"",
    "bloodPressure":"",
    "bodyTemp":"",
    "rapidCoronaTest":""
    
})


const DailyPatient = mongoose.model("Daily Patients",dailyUpdatedPatientSchema)
app.post('/adddailyPatient',(req,res)=>{
    const dailypatient=new DailyPatient({
        
        patientid:req.body.patientid,
        comments:req.body.comments,
        medicines:req.body.medicines,
        date: req.body.date,
        heartRate :req.body.heartRate,
        oxygenLevel :req.body.oxygenLevel,
        bloodPressure :req.body.bloodPressure,
        bodyTemp :req.body.bodyTemp,
        rapidCoronaTest :req.body.rapidCoronaTest 

    })
    dailypatient.save().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.get("/eachdaypatient/:id", (req,res)=>{
    DailyPatient.findById(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
})
app.get('/dailypatientdetails/:patientid',(req,res)=>{
    DailyPatient.find({patientid : req.params.patientid}).then(dailypatient=>{
        res.send(dailypatient)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});
app.put('/editdailypatientdetails/:id',(req,res)=>{
    DailyPatient.findByIdAndUpdate(req.params.id, {
        patientid:req.body.patientid,
        comments:req.body.comments,
        medicines:req.body.medicines,
        date: req.body.date,
        heartRate :req.body.heartRate,
        oxygenLevel :req.body.oxygenLevel,
        bloodPressure :req.body.bloodPressure,
        bodyTemp :req.body.bodyTemp,
        rapidCoronaTest :req.body.rapidCoronaTest
    },{new : true}).then(dailypatient=>{
        res.send(dailypatient)
    }).catch((err)=>{
        res.send({
            message: "some error happened"
        })
    })
});


app.listen(process.env.PORT || 4000, () => {
    console.log("App Server is listening on port 4000")
})
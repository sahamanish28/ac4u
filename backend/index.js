const port = 5000;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://sahamanish28:ManishSaha%4021@ac4u.yfrrtyl.mongodb.net/ac4u", {
}).then(() => {
    console.log(`Database connected to succesfully`);
}).catch((err) => {
    console.log(err);
});

const userModel = require("./models/user");
const appointmentModel = require("./models/appointment");
const clinicModel = require("./models/clinic_model");
const requestModel = require("./models/request");

app.get("/reviews", async (req, res) => {
    clinicModel.find()
        .then(reviews => {
            res.json(reviews);
        })
        .catch(err => {
            console.log("Reviews didn't send", err);
        })
});

app.get("/appointment", async (req, res) => {
    clinicModel.find()
        .then(result44 => {
            res.json(result44);
        })
        .catch(err => {
            console.log("clinic data didn't send", err);
        })
});

app.get("/admin_clinicreq", async (req, res) => {
    console.log('clinic request data requested');
    requestModel.find()
        .then(data => {
            console.log('clinic request data send');
            res.json(data);
        })
        .catch(err => {
            console.log("Request data didn't send", err);
        })
});

app.get("/admin_clinic", async (req, res) => {
    console.log('clinics data requested');
    clinicModel.find()
        .then(data => {
            console.log('clinics data send');
            res.json(data);
        })
        .catch(err => {
            console.log("Request data didn't send", err);
        })
});

app.get("/admin", async (req, res) => {
    console.log('Users data requested');
    userModel.find()
        .then(data => {
            console.log('Users data send');
            res.json(data);
        })
        .catch(err => {
            console.log("Request data didn't send", err);
        })
});

app.get("/user_appointment/:key", async (req, res) => {
    const phonenumber = req.params.key;
    console.log(phonenumber);

    appointmentModel.find({ userkey: phonenumber })
        .then(appointment => {
            if (appointment.length > 0) {
                res.json(appointment);
                console.log("appointment has been sent");
            } else {
                res.status(404).json({ message: "Appointment not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.get("/appointment_requests/:key", async (req, res) => {
    const name = req.params.key;

    appointmentModel.find({ clinic: name })
        .then(appointment => {
            if (appointment.length > 0) {
                res.json(appointment);
                console.log("appointment has been sent");
            } else {
                console.log("Appointment not found");
                res.status(404).json({ message: "Appointment not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.post("/reset_pass/:key", cors(), async (req, res) => {
    const email = req.params.key;
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `sahamanish28@gmail.com`,
            pass: `erzhlgvphcwyzljx`
        }
    });

    userModel.find({ email: email })
        .then((user) => {
            if (user) {
                const otp = generateOTP();
                const mailOptions3 = {
                    from: {
                        name: "Manish from AnimalCare4U",
                        address: `sahamanish28@gmail.com`
                    },
                    to: [email],
                    subject: "Reset password OTP",
                    text: `The otp for your password reset is ${otp}`
                };
                transporter.sendMail(mailOptions3, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(404).json({ message: "OTP didn't send" });
                    } else {
                        console.log(`OTP Email sent to: ${email}`);
                        res.json({ message: otp });
                    }
                });
            }
            else {
                res.status(500).json({ message: "Data not found" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });
});

app.post("/reset_pass_clinic/:key", cors(), async (req, res) => {
    const email = req.params.key;
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `sahamanish28@gmail.com`,
            pass: `erzhlgvphcwyzljx`
        }
    });

    clinicModel.find({ email: email })
        .then((user) => {
            if (user) {
                const otp = generateOTP();
                const mailOptions3 = {
                    from: {
                        name: "Manish from AnimalCare4U",
                        address: `sahamanish28@gmail.com`
                    },
                    to: [email],
                    subject: "Reset password OTP",
                    text: `The otp for your password reset is ${otp}`
                };
                transporter.sendMail(mailOptions3, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(404).json({ message: "OTP didn't send" });
                    } else {
                        console.log(`OTP Email sent to: ${email}`);
                        res.json({ message: otp });
                    }
                });
            }
            else {
                res.status(500).json({ message: "Data not found" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });
});

app.patch("/reset_password", cors(), async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    console.log(`Received request to update password for email: ${email}`);

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { password: password } },
            { new: true }
        );

        if (updatedUser) {
            console.log(`Password updated for ${email}`);
            res.send({ message: "password updated" });
        } else {
            console.log(`User not found with email: ${email}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Password not updated" });
    }
});

app.patch("/reset_password_clinic", cors(), async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    console.log(`Received request to update password for email: ${email}`);

    try {
        const updatedUser = await clinicModel.findOneAndUpdate(
            { email: email },
            { $set: { password: password } },
            { new: true }
        );

        if (updatedUser) {
            console.log(`Password updated for ${email}`);
            res.send({ message: "password updated" });
        } else {
            console.log(`User not found with email: ${email}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Password not updated" });
    }
});

app.get("/profile/:key", async (req, res) => {
    const phone = req.params.key;
    console.log(phone);
    userModel.findOne({ phone: phone })
        .then(user => {
            if (user) {
                res.json(user);
                console.log(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.get("/cprofile/:key", async (req, res) => {
    const phone = req.params.key;
    console.log(phone);
    clinicModel.findOne({ phone: phone })
        .then(user => {
            if (user) {
                res.json(user);
                console.log(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.post("/appointment", cors(), async (req, res) => {
    const { userkey, fullname, email, phonenumber, address, pets, gender, breed, location, clinic, date, time } = req.body;

    const data = {
        userkey: userkey,
        fullname: fullname,
        email: email,
        phonenumber: phonenumber,
        address: address,
        pets: pets,
        gender: gender,
        breed: breed,
        location: location,
        clinic: clinic,
        date: date,
        time: time,
        status:'Pending'

    }

    const feedback = `https://forms.gle/R2iYCThC1TyfGZSH8`;
    const clinic_mail = `bupendrayogi108@gmail.com`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: `helpanimalcare4u@gmail.com`,
            // pass: `emhzetfsqnayunkp`
            // user: `animalcareforu4@gmail.com`,
            // pass: `mxizqphyjrxhqfoe`
            user: `sahamanish28@gmail.com`,
            pass: `erzhlgvphcwyzljx`
        }
    });

    const mailOptions = {
        from: {
            name: "Manish from AnimalCare4U",
            address: `sahamanish28@gmail.com`
        },
        to: [email],
        subject: "Appointment booking email",
        text: `Dear ${fullname},

                We hope this message finds you well. On behalf of the entire team at AnimalCare4U, we would like to express our sincere gratitude for choosing our platform to book your recent appointment.
        
                We understand that you have a choice when it comes to scheduling appointments, and we are thrilled that you selected our website for your needs. Your trust means a lot to us, and we are committed to providing you with a seamless and enjoyable experience.
        
                Here are the details of your appointment:
        
                Date: ${date}
                Time: ${time}
                Location: ${location}
                Clinic: ${clinic}

                If you have any questions, need to make changes, or require further assistance, please feel free to reach out to our customer support team at animalcareforu4@gmail.com . We request you to please fill the given feedback form after your successfull appointment ${feedback}
        
                Once again, thank you for choosing AnimalCare4U. We look forward to serving you, and we hope your experience exceeds your expectations.
        
                Best Regards,
        
                AnimalCare4U`
    }

    const mailOptions2 = {
        from: {
            name: "manish from AnimalCare4U",
            address: `sahamanish28@gmail.com`
        },
        to: [clinic_mail],
        subject: "Appointment booking email",
        text: `Dear ${clinic},
        
                There is an appointment booked behalf of ${fullname}. We hope customer will experience a great service at your clinic.
        
                Here are the details of the appointment:
        
                Date: ${date}
                Time: ${time}

                If you have any questions, need to make changes, or require further assistance, please feel free to reach out to our customer support team at animalcareforu4@gmail.com .
        
                Thank you for choosing AnimalCare4U. We look forward to serving you, and we hope your experience exceeds your expectations.
        
                Best Regards,
        
                AnimalCare4U`
    }


    appointmentModel.insertMany(data)
        .then(e => {
            console.log("data inserted");
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            transporter.sendMail(mailOptions2, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ message: "appointment_done" });
        })
        .catch(err => {
            console.log(err);
            res.json({ message: "can't_make_appointment" });
        })

})

app.post("/signin", cors(), async (req, res) => {
    const { phone, password } = req.body;
    const token = phone;
    userModel.findOne({ phone: phone })
        .then((result) => {
            if (result.password === password) {
                res.json({ messege: "match", token: token });
                console.log("Password matched and token is ", token);
            }
            else {
                res.json({ messege: "not_match" });
                console.log("Password didn't matched");
            }
        })
        .catch(err => {
            res.json({ messege: "not_exist" })
            console.log("User not exists");
        })
})

app.post("/signup", cors(), async (req, res) => {
    const { username, email, phone, password } = req.body;

    const data = {
        username: username,
        email: email,
        phone: phone,
        password: password

    }
    userModel.findOne({ phone: phone })
        .then((result) => {
            if (result) {
                res.json({ message: "exists" });
                console.log("user already exists, cant sign up");
            }
            else {
                userModel.insertMany(data);
                res.json({ message: "success" });
                console.log('user created');
            }
        })
        .catch(e => {
            console.log(e);
        })
})

app.post("/clinic_request", cors(), async (req, res) => {

    const { clinicname, cliniclocality, clinicdesc, email, phone, password } = req.body;

    const data = {
        clinicname: clinicname,
        cliniclocality: cliniclocality,
        clinicdesc: clinicdesc,
        email: email,
        phone: phone,
        password: password

    }
    clinicModel.findOne({ phone: phone })
        .then((result) => {
            if (result) {
                res.json({ message: "exists" });
                console.log("clinic already exists, cant make request");
            }
            else {
                requestModel.insertMany(data);
                res.json({ message: "success" });
                console.log('request send');
            }
        })
        .catch(e => {
            console.log(e);
        })
})

app.post("/clinic_signin", cors(), async (req, res) => {
    const { phone, password } = req.body;
    const token = phone;
    clinicModel.findOne({ phone: phone })
        .then((result) => {
            if (result.password === password) {
                res.json({ messege: "match", token: token, name: result.clinicname });
                console.log("Password matched");
            }
            else {
                res.json({ messege: "not_match" });
                console.log("Password didn't matched");
            }
        })
        .catch(err => {
            res.json({ messege: "not_exist" })
            console.log("User not exists");
        })
});

app.delete("/admin_clinicreq/:id", cors(), async (req, res) => {
    const id = req.params.id;
    console.log(`delete request initiated for clinic id ${id}`);
    requestModel.findOneAndDelete({ _id: id })
        .then(result => {
            if (result) {
                res.json({ message: "done" });
                console.log('data deleted');
                const transporter96 = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `sahamanish28@gmail.com`,
                        pass: `erzhlgvphcwyzljx`
                    }
                });
            
                const mailOptions96 = {
                    from: {
                        name: "Manish from AnimalCare4U",
                        address: `sahamanish28@gmail.com`
                    },
                    to: [result.email],
                    subject: "Clinic request rejection mail",
                    text: `Dear ${result.clinicname},
            
                            We hope this message finds you well. On behalf of the entire team at AnimalCare4U, we would like to express our sincere gratitude for choosing our platform and joining us.
                    
                            We are sorry to let you know that your request for joining with us is not accepted. Thanks for choosing us, but right now we can't accept your joining. You can further join us by providing legitimate documents.
            
                            If you have any questions, need to make changes, or require further assistance, please feel free to reach out to our customer support team at animalcareforu4@gmail.com .
                    
                            Once again, thank you for choosing AnimalCare4U. We look forward to serving you, and we hope your experience exceeds your expectations.
                    
                            Best Regards,
                    
                            AnimalCare4U`
                }
                transporter96.sendMail(mailOptions96, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent');
                    }
                });
            }
            else {
                res.json({ message: 'cant find data' });
                console.log('cant find data');
            }
        })
        .catch(err => {
            res.json({ message: 'server error' });
            console.log(err);
        })
});

app.post("/admin_clinicreq/:id", cors(), async (req, res) => {
    const id = req.params.id;
    console.log(`accepting request initiated for clinic id ${id}`);
    requestModel.findOne({ _id: id })
        .then(result => {
            if (result) {
                const clinicdata = {
                    clinicname: result.clinicname,
                    cliniclocality: result.cliniclocality,
                    clinicdesc: result.clinicdesc,
                    email: result.email,
                    phone: result.phone,
                    password: result.password,
                    rating: 0,
                    total_rating: 0,
                    no_of_rating: 0
                }
                const transporter87 = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `sahamanish28@gmail.com`,
                        pass: `erzhlgvphcwyzljx`
                    }
                });
            
                const mailOptions87 = {
                    from: {
                        name: "Manish from AnimalCare4U",
                        address: `sahamanish28@gmail.com`
                    },
                    to: [result.email],
                    subject: "Clinic request aprooval mail",
                    text: `Dear ${result.clinicname},
            
                            We hope this message finds you well. On behalf of the entire team at AnimalCare4U, we would like to express our sincere gratitude for choosing our platform and joining us.
                    
                            We are glad to know you that your request for joining with us is accepted. Now you can login to your account with your registered phone number and password (${result.password}).
            
                            If you have any questions, need to make changes, or require further assistance, please feel free to reach out to our customer support team at animalcareforu4@gmail.com .
                    
                            Once again, thank you for choosing AnimalCare4U. We look forward to serving you, and we hope your experience exceeds your expectations.
                    
                            Best Regards,
                    
                            AnimalCare4U`
                }
                clinicModel.insertMany(clinicdata)
                    .then(responce2 => {
                        res.json({ message: 'clinic data accepted' });
                        console.log('clinic data accepted');
                        transporter87.sendMail(mailOptions87, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent');
                            }
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                requestModel.findOneAndDelete({ _id: id })
                    .then(responce => {
                        console.log(`clinic request data removed for ${id}`);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else {
                res.json({ message: 'cant find data' });
                console.log('cant find data');
            }
        })
        .catch(err => {
            res.json({ message: 'server error' });
            console.log(err);
        })
});

app.patch("/appointment_requests", async (req, res) => {
    const { id, status } = req.body;
    console.log(id);
    console.log(status);
    try {
        const updatedAppointment = await appointmentModel.findOneAndUpdate(
            { _id: id },
            { $set: { status: status } },
            { new: true }
        );

        if (updatedAppointment) {
            console.log(`Status updated for ${id}`);
            res.send({ message: "status updated" }); // Fix the message to "status updated"
        } else {
            console.log(`Appointment not found with id: ${id}`);
            res.status(404).json({ message: "Appointment not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Status not updated" });
    }
});

app.listen(port, () => {
    console.log(`Server has started at ${port}:`)
});
const mongoose =require('mongoose')

const appointmentSchema=new mongoose.Schema({
    userkey:{type:String,required:true},
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    phonenumber:{type:Number,required:true},
    address:{type:String,required:true},
    pets:{type:String,required:true},
    gender:{type:String,required:true},
    breed:{type:String,required:true},
    location:{type:String,required:true},
    clinic:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    status:{type:String,required:true}
});

const appointmentModel=mongoose.model("appointment",appointmentSchema);

module.exports= appointmentModel;

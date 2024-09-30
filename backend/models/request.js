const mongoose =require('mongoose')

const requestSchema=new mongoose.Schema({
    clinicname:{type:String,required:true},
    cliniclocality:{type:String,required:true},
    clinicdesc:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true}
});

const requestModel=mongoose.model("request",requestSchema);

module.exports= requestModel;
const mongoose =require('mongoose')

const clinicSchema=new mongoose.Schema({
    clinicname:{type:String,required:true},
    cliniclocality:{type:String,required:true},
    clinicdesc:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    rating:{type:Number},
    total_rating:{type:Number},
    no_of_rating:{type:Number}
});

const clinicModel=mongoose.model("clinic",clinicSchema);

module.exports= clinicModel;
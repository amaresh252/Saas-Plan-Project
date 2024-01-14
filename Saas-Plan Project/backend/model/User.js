const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const user=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    addresses:{type:[Schema.Types.Mixed]},
    userlimit:{type:Number,default:1},
    currentusercount:{type:Number,default:0},
    adminid:{type:String},
    plan:{type:String},
    duration:{type:String},
})

exports.User=mongoose.model('User',user);
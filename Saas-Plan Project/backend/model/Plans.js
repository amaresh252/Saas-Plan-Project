const mongoose=require('mongoose');
const {Schema}=mongoose;

const plansSchema=new Schema({
    planName:{type:String,required:true},
    price:{type:Number,required:true},
    duration:{type:String,required:true},
    maxUsers:{type:Number,required:true},
    features:{type:String,required:true}
})

exports.Plans=mongoose.model('Plans',plansSchema);
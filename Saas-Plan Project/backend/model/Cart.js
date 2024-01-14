const mongoose =require('mongoose')
const {Schema} = mongoose;

const cart=new Schema({
   plans:{type:Schema.Types.ObjectId, ref:'Plans',required:true},
   Admin:{type:Schema.Types.ObjectId,ref:'User',required:true}
});

exports.Cart=mongoose.model('Cart',cart)
const mongoose=require('mongoose')
const {Schema}=mongoose;

const order=new Schema({
    plans:{type:[Schema.Types.Mixed],required:true},
    address:{type:Schema.Types.Mixed,required:true},
    paymentMethod:{type:String,required:true},
    adminid:{type:String,required:true},
    status:{type:String,required:true}
})

exports.Order=mongoose.model('Order',order)
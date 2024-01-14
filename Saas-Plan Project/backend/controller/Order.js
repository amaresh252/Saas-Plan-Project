const {Order}=require('../model/Order')

exports.createOrder=async(req,res)=>{
    try{
        const order=new Order({...req.body})
        const doc=await order.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json({message:'order not placed'})
    }
}

exports.fetchUserOrder=async(req,res)=>{
    const{adminid}=req.params;
    try{
        const order=await Order.find({adminid:adminid})
        res.status(200).json(order);
    }catch(err){
        res.status(400).json({message:'order not fetched'})
    }
}
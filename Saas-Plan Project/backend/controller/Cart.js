const { Cart } =require('../model/Cart')


exports.addToCart=async(req,res)=>{
        try{
            const cart=new Cart({...req.body})
            const doc=await cart.save()
            const  item=await doc.populate('plans');
            res.status(201).json(item);
        }catch(err){
            res.status(400).json({message:'Not added to cart'})
        }
}

exports.fetchToCart=async(req,res)=>{
   const {userid}=req.params;
    try{
        const  cartItem=await Cart.find({Admin:userid}).populate('plans')
        res.status(200).json(cartItem);
    }catch(err){
        res.status(400).json({message:'plans  is not fetched'})
    }
}

exports.removeToCart=async(req,res)=>{
    const {_id}=req.params;
    try{
        const removeditem=await Cart.findByIdAndDelete(_id);
        if(removeditem){
            res.status(200).json(removeditem);
        }
        else {
            res.status(400).json({message:'plans  is not removed'})
        }
       
    }catch(err){
        res.status(400).json({message:'error during removal'})
    }
}

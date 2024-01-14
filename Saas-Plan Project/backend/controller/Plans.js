const {Plans}=require('../model/Plans')


exports.AddPlans=async(req,res)=>{
    try{
        const plans=new Plans({...req.body});
        const doc=await plans.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchPlans=async(req,res)=>{
    try{
       const{userid}=req.params;
       const plans=await Plans.find({userid:userid});
       if(plans){
        res.status(200).json(plans); 
       }
       else {
        res.status(400).json({message:'not fetching'})
       }
       
    }catch(err){
        res.status(400).json({message:'not fetching'});
    }
}

exports.deletePlans=async(req,res)=>{
    const {_id}=req.params ;
    try{
        const deletedPlans=await Plans.findByIdAndDelete(_id);
        if(deletedPlans){
            res.status(200).json({message:'deleted successfully'});
        }
        else {
            res.status(400).json({message:'not deleted'}) 
        }
    }catch(err){
         res.status(400).json(err); 
    }
}
exports.updatePlans=async(req,res)=>{
    const {_id}=req.params;
    try{
        const updatedPlans=await Plans.findByIdAndUpdate(_id,req.body,{new:true});
        if(updatedPlans){
            res.status(200).json(updatedPlans);
        }
        else {
            res.status(400).json({message:'not updated'});
        }
    }catch(err){
        res.status(400).json(err);
    }
}


const {User}=require('../model/User')
exports.createUser=async (req,res)=>{
    try{
        const user=new User({...req.body})
        const doc=await user.save();
        req.session.user = {
            username: doc.username,
            _id: doc._id,
            role: doc.role,
            addresses: doc.addresses,
            userlimit: doc.userlimit,
            currentusercount: doc.currentusercount,
            adminid:doc.adminid,
          };
        res.status(201).json(req.session.user);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


exports.loginUser=async (req,res)=>{
    const{username,password,role}=req.query;
    const user= await User.findOne({username:username});
    try{
        
        if(password===user.password &&  role===user.role){
            req.session.user = {
                _id: user._id,
                username: user.username,
                role: user.role,
                addresses: user.addresses,
                userlimit: user.userlimit,
                currentusercount: user.currentusercount,
                adminid:user.adminid,
              };
            res.status(200).json(req.session.user);
           
        }
        else {
            res.status(400).json({message:'wrong credential'})
        }

    }catch(err){
        res.status(400).json({message:'wrong username'});
    }
}

exports.signOut=async(req,res)=>{
    try{
        res.status(200).send({data:'success'})
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.updateUser=async(req,res)=>{
    const{_id}=req.params;
    try{
        const user=await User.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }
}
exports.fetchAllUser=async (req,res)=>{
    
    const user= await User.find({role:'Admin'});
    try{
            res.status(200).json(user);

    }catch(err){
        res.status(400).json({message:'not fetched'});
    }
}



const model= require("../models/user1");


exports.createTask = async(req,res) =>{
    try{
        const data = await new model(req.body).save();
        res.json(data);
    }
    catch(err){
        console.err(err);
    }
}


exports.getAllTask = async(req,res) =>{

    try{
        const resData = await model.find();
        return(res.json(resData));
    }
    catch(err){
        console.error(err);
    }
}

exports.getTask = async(req,res) =>{

    try{
        const resData = await model.find({_id:req.params.taskID});
        return(res.json(resData));
    }
    catch(err){
        console.error(err);
    }
}



exports.updateTask = async(req,res) =>{

    try{
        const userData = await model.findOneAndUpdate({_id:req.params.taskID},req.body,{new:true});
        res.json(userData);
    }
    catch(err){
        console.error(err);
    }

}


exports.deleteTask = async(req,res) =>{

    try{
        await model.findOneAndDelete({_id:req.params.taskID});
        return(res.json());
    }
    catch(err){
        return(res.json(err));
    }
}
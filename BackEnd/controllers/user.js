

const model= require("../models/user");


exports.createCategory = async(req,res) =>{
    try{
        const data = await new model(req.body).save();
        res.json(data);
    }
    catch(err){
        console.err(err);
    }
}


exports.getAllCategory = async(req,res) =>{

    try{
        const resData = await model.find();
        res.json(resData);
    }
    catch(err){
        console.error(err);
    }
}


exports.getCategory = async(req,res) =>{

    try{
        const resData = await model.find({_id:req.params.userID});
        res.json(resData);
    }
    catch(err){
        console.error(err);
    }
}


exports.updateCategory = async(req,res) =>{

    try{
        const userData = await model.findOneAndUpdate({_id:req.params.userID},req.body,{new:true});
        res.json(userData);
    }
    catch(err){
        console.error(err);
    }

}


exports.deleteCategory = async(req,res) =>{

    try{
        await model.findOneAndDelete({_id:req.params.userID});
    }
    catch(err){
        return(res.json(err));
    }
}
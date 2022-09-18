const { User } = require("../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');




const getAuth = async (req,res)=>{
    try {
        const {email, password}=req.body;
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        const user = await User.findAll({where: {email:email}});
        const pass=user[0].dataValues.password
        
        
        if(user.length==false){
            res.status(401.1).send('usuario no existe')
        }else if(/*await bcrypt.compare(password, pass ) == true*/ pass==password){
            
            res.status(200).send({user})
        }else{
            res.status(401.1).send("ok:false")
        }
    } catch (error) {
        res.status(401.1).send("ok:false")
    }
   

}
module.exports= {getAuth}
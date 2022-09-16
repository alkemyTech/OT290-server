const { Members } = require('../models');


const getMembers= async (req,res)=>{
    try {
        const members = await Members.findAll()
        res.send(members)
    } catch (error) {
        res.send(error)
    }
    };

    const getMember= async (req,res)=>{
        
        const {id}=req.params
        try {
            const member= await Members.findByPk(id)
            if (!member) {
               return  res.send("Not found")
            }
            res.send(member)
        } catch (error) {
            res.send(error)
        }
    };

    const createMember= async (req,res)=>{
        
        const{name, image}=req.body
        
        try {
            const member= await Members.create({
                name: name,
                image:image
               
            });
           
           
            res.send(member)
        } catch (error) {
            res.send(error)
        }
        
    };

    const updateMember= async (req,res)=>{
        const {id}=req.params
        const{name, image}=req.body
        
        try {
            const member= await Members.update({
                name: name,
                image:image,
                
            }, {where: {id}});
        
            res.send(`Member update id ${id}`)
        } catch (error) {
            res.send(error)
        }
    };

    const deletemember= async (req,res)=>{
        
        const {id}=req.params
        console.log(id);
        try {
            const member= await Members.destroy({where:{id}})
            if (!member) {
                return res.send("Not found")
            }
            res.send("Member delete")
        } catch (error) {
            res.send(error)
        }
    };


    module.exports={
        getMembers,
        getMember,
        createMember,
        updateMember,
        deletemember

    }
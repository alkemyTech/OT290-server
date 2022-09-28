
const { Organization } = require('../models');



   const getOrganizations= async (req,res)=>{
    try {
        const organizations = await Organization.findAll()
        res.send(organizations)
    } catch (error) {
        res.send(error)
    }
    };

    const getOrganion= async (req,res)=>{
        
        const {id}=req.params
        try {
            const organitation= await Organization.findByPk(id)
            if (!organitation) {
               return  res.send("Not found")
            }
            res.send(organitation)
        } catch (error) {
            res.send(error)
        }
    };

    const createOrganion= async (req,res)=>{
        
        const{name, image, address, phone, email,welcomeText, aboutUsText}=req.body
        
        try {
            const organitation= await Organization.create({
                name: name,
                image:image,
                address:address,
                phone:phone,
                email:email,
                welcomeText:welcomeText,
                aboutUsText
            });
           
           
            res.send(organitation)
        } catch (error) {
            res.send(error)
        }
        
    };
    
    const updateOrganion= async (req,res)=>{
        const {id}=req.params
        const{name, image, address, phone, email,welcomeText, aboutUsText}=req.body
        
        try {
            const organitation= await Organization.update({
                name: name,
                image:image,
                address:address,
                phone:phone,
                email:email,
                welcomeText:welcomeText,
                aboutUsText:aboutUsText
            }, {where: {id}});
        
            res.send(`Organitation update id ${id}`)
        } catch (error) {
            res.send(error)
        }
    };

    const deleteOrganion= async (req,res)=>{
        
        const {id}=req.params
        console.log(id);
        try {
            const organitation= await Organization.destroy({where:{id}})
            if (!organitation) {
                return res.send("Not found")
            }
            res.send("Organization delete")
        } catch (error) {
            res.send(error)
        }
    };




module.exports = {
    getOrganizations,
    getOrganion,
    createOrganion,
    updateOrganion,
    deleteOrganion
}
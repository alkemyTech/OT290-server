const { Contact } = require('../models');

const getContacts= async (req,res)=>{
    try {

        const contacts = await Contact.findAll()
        res.send(contacts)
    } catch (error) {
        res.send(error)
    }
    };



module.exports={
    getContacts
}
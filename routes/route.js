const express =require('express');
const router = express.Router();
const Contact = require('../models/contacts');


router.get('/contacts',(req,res,next)=>{
    // res.send("Retrieving data!");
    Contact.find(function(err,contacts){
        res.json(contacts);

    })
});

router.post('/contacts',(req,res,next)=>{

    // add contact
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });
    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:"Error occured! "+err});
        }
        else{
            res.json({msg:"Contact saved"});
        }

    })
});

router.delete('/contacts/:id',(req,res,next)=>{
    // delete contact
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    })
  
});
module.exports= router;

let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let Contact = require('../model/contacts');
const Book = require("../model/books");


module.exports.displayContactList = (req, res, next) => {
    Contact.find({})
        .collation({ locale: "en", strength: 2 })
        .sort({ name: 1 })
        .exec((err, contactList) => {
            if (err) {
                return console.error(err);
            } else {
                res.render("contact/list", {
                    title: "Contact",
                    ContactList: contactList,
                    displayName: req.user ? req.user.displayName : "",
                });
            }
        });
};

module.exports.displayAddPage = (req,res,next)=>{
    res.render('contact/add',{title:'Add contact',
        displayName:req.user ? req.user.displayName:''})
}

module.exports.processAddPage = (req,res,next)=>{
    let newContact = Contact({
        "name": req.body.name,
        "email":req.body.email,
        "number":req.body.number
    });
    Contact.create(newContact,(err,Contact)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contactList');
        }
    });
}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    Contact.findById(id,(err,contactToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit',{title:'Edit Contact', contact: contactToEdit,
                displayName:req.user ? req.user.displayName:''});
        }

    });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id
    console.log(req.body);
    let updatedContact = Contact({
        "_id":id,
        "name":req.body.name,
        "email":req.body.email,
        "number":req.body.number
    });
    Contact.updateOne({_id:id}, updatedContact,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contactList');
        }
    });
}

module.exports.performDelete= (req,res,next)=>{
    let id = req.params.id;
    Contact.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contactList');
        }

    });
}
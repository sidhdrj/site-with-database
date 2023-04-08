let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../model/books');

module.exports.displayBookList = (req, res, next) => {
    Book.find({})
      .collation({ locale: "en", strength: 2 })
      .sort({ name: 1 })
      .exec((err, bookList) => {
      console.log(req.user);
        if (err) {
          return console.error(err);
        } else {
          res.render("book/list", {
            title: "Books You Love",
            BookList: bookList,
            displayName: req.user ? req.user.displayName : "",
            isAdmin: req.user.isAdmin ? req.user.isAdmin : false,
          });
        }
      });
  };

module.exports.displayAddPage = (req,res,next)=>{
    res.render('book/add',{title:'Add Book',
    displayName:req.user ? req.user.displayName:''})
}

module.exports.processAddPage = (req,res,next)=>{
    let newBook = Book({
        "name": req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price,
        "stars": req.body.stars
    });
    Book.create(newBook,(err,Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
        res.redirect('/bookList');
        }
    });
    }

module.exports.displayEditPage = (req,res,next)=>{
            let id = req.params.id;
            Book.findById(id,(err,bookToEdit)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('book/edit',{title:'Edit Book', book: bookToEdit,
                    displayName:req.user ? req.user.displayName:''});
                }
            
            });
        }

module.exports.processEditPage = (req,res,next)=>{
            let id = req.params.id
            console.log(req.body);
            let updatedBook = Book({
                "_id":id,
                "name":req.body.name,
                "author":req.body.author,
                "published":req.body.published,
                "description":req.body.description,
                "price":req.body.price,
                "stars":req.body.stars
            });
            Book.updateOne({_id:id}, updatedBook,(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/bookList');
                }
            });
        }

module.exports.performDelete= (req,res,next)=>{
            let id = req.params.id;
            Book.remove({_id:id},(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/bookList');
                }
                
            });
            }
        
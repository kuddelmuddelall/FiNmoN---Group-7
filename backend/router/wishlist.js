const database = require('../database');
const express = require('express');

const router = express.Router();

const db = database.callDatabase

// backend for Read
const backend_wishlistRead = (req,res) => {
    const child_id = req.body.child_id

    db.query("SELECT * FROM wishlist WHERE child_id = ? ORDER BY (goal/price) DESC", 
    child_id,
    (err,result)=>{
        if(err) {
            console.log(err);
            res.status(500).send("Internal Server Error") 
        } else {
            console.log("success"); 
            res.status(200).send(result);
        } 
    })
}
 // backend for Write
const backend_wishlistCreate = (req,res) => {
    const child_id = req.body.child_id;
    const type = req.body.type;
    const category = req.body.category;
    const item_name = req.body.item_name;
    const price = req.body.price;
    const goal = req.body.goal;

    db.query("INSERT INTO wishlist (child_id,type,category,item_name,price,goal) VALUES (?,?,?,?,?,?)", 
    [child_id,type,category,item_name,price,goal], 
    (err,result) =>{
        if(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("wishlist added"); 
        };
    })
}

// backend for Update
const backend_wishlistUpdate = (req,res) => {
    const id = req.body.id;
    const type = req.body.type;
    const category = req.body.category;
    const item_name = req.body.item_name;
    const price = req.body.price;

    db.query("UPDATE wishlist SET type = ?, category = ?, item_name = ?, price = ? WHERE id = ?",
    [type,category,item_name,price,id],
    (err,result) => {
        if(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("wishlist updated"); 
            res.status(200).send(result); 
        };
    })
}

// backend for Delete
const backend_wishlistDelete = (req,res) => {
    const id = req.params.id

    db.query("DELETE FROM wishlist WHERE id = ?", id, 
    (err,result) => {
        if(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("wishlist deleted");
            res.status(200).send(result); 
        };
    })
}

router.post('/wishlist/read', backend_wishlistRead);
router.post('/wishlist/create', backend_wishlistCreate);
router.put('/wishlist/update',backend_wishlistUpdate);
router.delete('/wishlist/delete/:id',backend_wishlistDelete);

module.exports = {router}
const path = require('path');
const signRouter = require('express').Router();
const myres = require(path.resolve(__dirname,'../response'));

signRouter.post('/login',(req,res) => {

})

signRouter.post('/register',(req,res) => {

})


module.exports = signRouter;
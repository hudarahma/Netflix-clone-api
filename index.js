const express = require('express'); // importing express
const app = express() // initialize express
const axios = require('axios')
const mongoose = require('mongoose');
const { response } = require('express');
const {Schema} = mongoose; //Grab the schema object from mongoose
const port = 3000   // setting the port
require('dotenv').config();
var cors = require('cors');



app.use(cors());

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bm9ao.mongodb.net/netflixDB?retryWrites=true&w=majority`,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true

});


const User = mongoose.model('Users', new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}));

app.use(express.json());    //to use the data 





// Using the get method
app.get('/', (req,res) => {
    res.send('Hello World')
})



app.post('/register', (req,res)=>{
    const newUser = new User({
        name: req.body.name ,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err, user)=>{
      
        if(err) {
            console.log(err);
            res.send(400, {
                status: 'Not Valid'
            })
        } else {
            console.log('all is good');
            console.log(user);
            res.send(200, {
                status: 'registered'
            });
        }
    })
})


app.post('/login', (req,res)=>{
   
    const password = req.body.password;
    const email = req.body.email;
    User.findOne({ email: email, password: password}, (err, user)=>{
        console.log(user);
        if(user){
            res.send({
                status: 'Valid',
                token: user.id
            });
        } else {
            res.send(404, {
            status: "Not Found"
           })
        }
    })

})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
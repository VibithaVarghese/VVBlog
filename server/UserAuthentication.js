const bcrypt = require('bcrypt');
const { MongoClient } = require("mongodb");

const saltRounds = 10;

require("dotenv").config();
const { MONGO_URI, SITE_USERNAME, SITE_PWD } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const loadUser = async (hash) => {
    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try{

        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("BlogData");

        const userInDB = await db.collection("user").find().toArray();
            
        if(userInDB.length === 0) {
            const result = await db.collection("user").insertMany([{"user": SITE_USERNAME,"pwd": hash}])
            .then((result) => {
                console.log(result);            
            }).catch((err) => {
                console.log(err);
            });
        }

    } catch (err) {
        console.log(err.stack);    
    }

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
}

const loadUserToDB = () => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(SITE_PWD, salt, (err, hash) => {
            // Store hash in your password DB.
            loadUser(hash);
            
            
        });
    });
}

const authenticateUser = async (req, res) => {
    console.log('inside the post',req.body);
    // let user = req.body.user;
    // let pwd = req.body.pwd;

    let userFromFrontEnd = "admin";
    let pwdFromFrontEnd = "GODilu!2"
    let userInDB;
    let pwdInDB;



        //creates a new client
        const client = new MongoClient(MONGO_URI, options);

        // connect to the client
        await client.connect();
    
        try{
    
            // connect to the database (db name is provided as an argument to the function)
            const db = client.db("BlogData");
    
            const userFromDB = await db.collection("user").find().toArray();
                
            if(userFromDB.length !== 0) {
                console.log(userFromDB);
                userInDB = userFromDB[0].user;
                pwdInDB = userFromDB[0].pwd;
                console.log(userInDB, pwdInDB);
            // Load hash from your password DB.
                bcrypt.compare(pwdFromFrontEnd, pwdInDB, (err, result) => {
                    // result == true
                    if(result && userInDB === userFromFrontEnd) {
                        console.log("it matched");
                        res.status(200).json({status:200, data: "loggedIn"});
                    } else {
                        console.log("not matched");
                        res.status(200).json({status:200, data: "Not loggedIn"});
                    }
                });
            }
    
        } catch (err) {
            console.log(err.stack);  
            res.status(404).json({status:404, message:"something went wrong"});   
        }
    
     // close the connection to the database server
        client.close();
        console.log("disconnected!");
}


module.exports = {
    loadUserToDB, 
    authenticateUser,      
};


const blogData = require("./data/blogData.json");
const comments = require("./data/comments.json");


const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


const batchImport = async () => {

    console.log(comments);

    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try{

        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("BlogData");

        const blogDataInDB = await db.collection("data").find().toArray();
        const commentsInDB = await db.collection("comments").find().toArray();

       
        if(blogDataInDB.length === 0) {
            const result = await db.collection("data").insertMany(blogData)
            .then((result) => {
                console.log(result);            
            }).catch((err) => {
                console.log(err);
            });
        }

        
        if(commentsInDB.length === 0) {
            const resultComments = await db.collection("comments").insertMany(comments)
            .then((resultComments) => {
                console.log(resultComments);            
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

module.exports = {
    batchImport,
};

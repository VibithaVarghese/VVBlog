const blogData = require("./data/blogData.json");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


const batchImport = async () => {

    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try{

        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("BlogData");

        const blogDataInDB = await db.collection("data").find().toArray();
        

        /*
        If the flights does not exist then add the flight reservation to the database
        Since we are checking that length is zero the flights will be added only once.
        */
        if(blogDataInDB.length === 0) {
            const result = await db.collection("data").insertMany(blogData)
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

module.exports = {
    batchImport,
};

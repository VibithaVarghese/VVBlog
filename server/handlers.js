const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // returns a list of all BlogData
const getBlogData = async (req, res) => {

    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try{

       // connect to the database 
       const db = client.db("BlogData");
       console.log("connected!");

       // get the blog data from the collection data
       const dataInDB = await db.collection("data").find().toArray();
 

       // Send the response to the front end 
       res.status(200).json({status:200, data: dataInDB});
      
   } catch (err) {
       console.log(err.stack); 
       res.status(404).json({status:404, message:"something went wrong"});   
   }

    // close the connection to the database server
   client.close();
   console.log("disconnected!");
};

 // returns a list of all BlogData
 const getCommentsData = async (req, res) => {

    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try{

       // connect to the database 
       const db = client.db("BlogData");
       console.log("connected!");

       // get the comments data from the collection data
       const commentsInDB = await db.collection("comments").find().toArray();
 

       // Send the response to the front end
       res.status(200).json({status:200, data: commentsInDB});
      
   } catch (err) {
       console.log(err.stack); 
       res.status(404).json({status:404, message:"something went wrong"});   
   }

    // close the connection to the database server
   client.close();
   console.log("disconnected!");
};

const createComment = async (req, res) => {

    let data = req.body;

    
        let id = uuidv4();

        console.log(id);

        let newData = { id:id, ...data};


    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
try{
    // console.log(req.body);
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("BlogData");
    console.log("connected!");
    
    await db.collection("comments").insertOne(newData)
    .then((result) => {
        console.log(result);            
    }).catch((err) => {
        console.log(err);
    });

    res.status(201).json({ status: 201, data: newData });

} catch (err) {
    console.log(err.stack);
    res.status(404).json({status:404, message:"something went wrong"}); 
}

 // close the connection to the database server
 client.close();
 console.log("disconnected!");

}


// updates an existing reservation
const updateComment = async (req, res) => {

    
        //get Id
        let commentId = req.params.commentID;

        let data = req.body;

       
        console.log(data);

        console.log(commentId);

        //creates a new client
        const client = new MongoClient(MONGO_URI, options);

        // connect to the client
        await client.connect();
        try{
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("BlogData");
        console.log("connected!");

        const query = { id: commentId };
        const newValues = { $set: { ...data } };

        console.log(query, newValues);

        await db.collection("comments").updateOne(query, newValues)
        .then((result) => {
            console.log(result);                   
        }).catch((err) => {
            console.log(err);
        });

        res.status(200).json({status:200, data: newValues});

    } catch (err) {
        console.log(err.stack); 
        res.status(404).json({status:404, message:"something went wrong"});   
    }
   
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

// deletes a specified comment
const deleteComment = async (req, res) => {
        
    //get Id
    let commentId = req.params.commentID;


    console.log(commentId);

    //creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    try {
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("BlogData");
        console.log("connected!");
        
        const result = await db.collection("comments").deleteOne({"id":commentId});
        console.log(result);
        res.status(200).json({status:200, data: commentId});
       

        } catch (err) {
            console.log(err.stack);
    
}

 // close the connection to the database server
 client.close();
 console.log("disconnected!");
};




module.exports = {
    getBlogData, 
    getCommentsData,
    createComment,  
    updateComment, 
    deleteComment,
};

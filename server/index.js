const express = require('express');
const app = express();
const port = 8000;

// import the batch import function from the batch import file.
const {
    batchImport,
} = require("./batchImport")
// call the batch import function to import the blogData from the blog.
batchImport();

// import the user data load from the user authentication file
const {
    loadUserToDB,
    authenticateUser,
} = require("./UserAuthentication")
// call the load user DB function to load the user to mongo DB
loadUserToDB();

const {
    getBlogData,
    getCommentsData,
    createComment,
    updateComment,
    deleteComment,
} = require("./handlers");

app.get("/api/get-blogData", getBlogData)
app.get("/api/get-CommentsData", getCommentsData)
app.post("/api/authenticate", authenticateUser)
app.post("/api/add-comment", createComment)
app.patch("/api/update-comments/:commentID", updateComment)
app.delete("/api/delete-comments/:commentID", deleteComment)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
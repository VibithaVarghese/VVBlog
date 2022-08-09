const express = require('express');
const app = express();
const port = 8000;

// import the batch import function from the batch import file.
const {
    batchImport,
} = require("./batchImport")
// call the batch import function to import the blogData from the blog.
batchImport();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
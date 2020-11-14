const express = require('express'); // importing express
const app = express() // initialize express
const port = 3000   // setting the port


// Using the get method
app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
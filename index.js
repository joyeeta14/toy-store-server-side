const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;



app.get('/', (req, res)=>{
    console.log('Connected');
})

app.listen(port, ()=>{
    console.log(`connected in ${port}`);
})
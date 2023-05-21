const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middle-wares
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@cluster0.aibkcfj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology : true,
  maxPoolSize: 10,
});
const userCollection = client.db("toyDB");
const toyInfo = userCollection.collection("toyInfo");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect(error => {
      if(error){
        console.log(error);
        return;
      }
    })

     app.get('/addToy',async(req,res)=>{
        const cursor = toyInfo.find();
        const result = await cursor.toArray();
        res.send(result);
     })

     app.get('/addToy/:id',async(req,res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await toyInfo.findOne(query);
        res.send(result);
     })

     app.get('/addToy/:text',async(req,res)=>{
        const text = req.params.text;
        if(text == 'mini-car'|| text == 'lego-truck' || text == 'police-car' ){
          const result = await toyInfo.find({category : text }).toArray();
          return res.send(result);
        }
        const result = await toyInfo.find({}).toArray();
        res.send(result);
     })



     app.get('/addToy',async(req,res)=>{
      let query ={};
      if(req.query?.email){
        query = {email : req.query.email};
      }
        const result = await toyInfo.find(query).toArray();
        res.send(result);
     })

     app.post('/addToy', async(req,res)=>{
        const user = req.body;
        const result = await toyInfo.insertOne(user);
        res.send(result);
     })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //  client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res)=>{
    console.log('Connected');
    res.send('connected...all ok now');
})

app.listen(port, ()=>{
    console.log(`connected in ${port}`);
})
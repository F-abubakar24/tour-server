const express = require('express')
const { MongoClient } = require('mongodb');



const app = express()
const port = process.env.PORT || 4000;

// MIDDLE wayar
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.of2la.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// -------------------------------------------------------------------

async function run() {
  try {
    await client.connect();
    const database = client.db("tour-data");
    const dataCollection = database.collection("data");


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



// -------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send("tour Web Server Running")
})

app.listen(port, () => {
    console.log("Server running from ---------------------> ", port);
})
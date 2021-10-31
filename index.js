const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// MIDDLE wayar
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.of2la.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// -------------------------------------------------------------------
// DATABASE connection main function;
async function run() {
    try {
        await client.connect();
        const database = client.db("tour_travel");
        const dataCollection = database.collection("data");
        const bookingCollection = database.collection("booking");

        // GET api
        app.get("/hotels", async (req, res) => {
            const cursor = dataCollection.find({});
            const hotels = await cursor.toArray();
            res.send(hotels);
        })

        // get booking all data
        app.get("/booking", async (req, res) => {
            const cursor = bookingCollection.find({});
            const hotels = await cursor.toArray();
            res.send(hotels);
        })

    // GET SINGLE api
        app.get("/hotels/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const hotel = await dataCollection.findOne(query)
            res.json(hotel);
        })
        
    // Add booking order info
        app.post("/booking", async (req, res) => {
            const order = req.body;
            const result = await bookingCollection.insertOne(order);
            res.json(result);
        })
        
    // GET BOOKING single api
        app.get("/booking/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const hotel = await bookingCollection.findOne(query)
            res.json(hotel);
        })

        // DELETE api
        app.delete("/booking/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// -------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("tour Web Server Running");
});

app.listen(port, () => {
    console.log("Server running from ---------------------> ", port);
});

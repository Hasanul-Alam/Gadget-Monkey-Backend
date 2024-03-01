const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// username: mydbuser2
// password: CekJho4UZ5uG0tiq


const uri = "mongodb+srv://mydbuser2:CekJho4UZ5uG0tiq@cluster0.uvq0yvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db("Gadget-Monkey");
        const productsCollection = database.collection("produts");

        // Get API
        app.get('/products', async(req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })

        // Find a document
        app.get('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const product = await productsCollection.findOne(query);
            res.send(product);
        })

        // Post API
        app.post('/products', async(req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            console.log('Got product ', product);
            res.send(result)
        })

        // Delete API
        app.delete('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })
    }

    finally {
        // Close the MongoDB client connection
        //    await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Alhamdulillah node is running successfully.');
})

app.listen(port, () => {
    console.log('Running on port ', port);
})
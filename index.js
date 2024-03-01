const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express());

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

        const doc = {
            name: 'Laptop',
            price: 150000,
            quantity: 12
        }
        app.get('/products', async(req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })

        // const result = await productsCollection.insertOne(doc);
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
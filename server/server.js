import express from "express";
import { connectDB,getDB } from "./db/conn.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());

await connectDB().then((e) => {
    console.log("db connected successfully:",e);
});

app.post("/add-user", async (req, res) => {
  const db = getDB();
  const user = req.body;

  try {
    const result = await db.collection("users").insertOne(user);
    res.json({ message: "User added", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req,res) => {
    const db = getDB();
    try{
        const result = await db.collection("users").find().toArray();
        res.json(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

app.get("/users/:id", async (req,res) => {
    const db = getDB();
    const id = req.params.id;
    try{
        const result = await db.collection("users").findOne({_id: new ObjectId(id)});
        if (!result){
            res.status(404).json("error: user not found");
        }
        res.json(result);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

app.put("/users/:id", async (req,res) => {
    const db = getDB();
    const id = req.params.id;
  const updates = req.body;
  try{
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated", result });
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

app.delete("/users/:id", async (req,res) => {
    const db = getDB();
    const id = req.params.id;
    try{
        const result = await db.collection("users").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted", result });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


app.listen(3000, (req,res) => {
    console.log("server listening on port 3000");
});
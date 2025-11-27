import express from "express";
import fs from "fs/promises";

const app = express();

app.use(express.json());


app.post("/user/login", (req, res) => {
  const { username, password } = req.body;


  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));


  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

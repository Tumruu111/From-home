import fs from "fs/promises";

export const login = (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }


  res.cookie("user", JSON.stringify({ id: user.id, username: user.username }), {
    httpOnly: true,
    secure: false, 
  });

  res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
};

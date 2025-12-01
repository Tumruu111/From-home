import fs from "fs";
import path from "path";

export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    const filePath = path.join("data", "users.json");

    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log("amjilttai!");
      res.cookie("user", JSON.stringify({ username }), {
        httpOnly: true,
        secure: false,
      });
      return res.json({ message: "Logged in", user: { username } });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("user");
  res.send("Success!");
};

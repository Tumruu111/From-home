export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password

  res.cookie("user", JSON.stringify({ id: userId, username }), {
    httpOnly: true,
    secure: false, 
  });

  res.json({ message: "Logged in", user: { id: userId, username } });
};

export const logout = (req, res) => {
  res.clearCookie("user");
  res.send("Success!");
};

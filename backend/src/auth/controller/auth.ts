import { Request, Response } from "express";

export const meController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    res.json({ user: { id: 123 } });
  } else {
    res.json(undefined);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "pass123") {
    res.json({ token: "admin-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

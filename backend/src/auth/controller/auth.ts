import { Request, Response } from "express";

export const meController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = undefined;

  res.json(user);
};

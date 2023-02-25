import { Request, Response, Router } from "express";

const signoutRouter = Router();

signoutRouter.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;

  return res.send({});
});

export { signoutRouter };

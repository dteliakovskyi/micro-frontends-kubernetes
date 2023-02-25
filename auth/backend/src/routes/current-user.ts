import { authorization } from "@joise/common";
import { Request, Response, Router } from "express";

const currentUserRouter = Router();

currentUserRouter.get(
  "/api/users/current-user",
  authorization,
  (req: Request, res: Response) => {
    if (req?.currentUser) {
      return res.send({ currentUser: req.currentUser });
    }

    return res.send({ currentUser: null });
  }
);

export { currentUserRouter };

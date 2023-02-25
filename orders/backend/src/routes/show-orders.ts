import { Request, Response, Router } from "express";
import { Order } from "../models";

const showOrdersRouter = Router();

showOrdersRouter.get("/api/orders", async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser.id,
  }).populate("ticket");

  res.status(200).send({ orders });
});

export { showOrdersRouter };

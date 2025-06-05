import { Router } from "express";
import { add_item } from "../controller/items/Add_item";
import { update_item } from "../controller/items/update_item";
import { delete_item } from "../controller/items/delete_item";
import { RequestHandler } from "express";

const itemsRouter = Router();

itemsRouter.post("/Add_item", add_item as unknown as RequestHandler);
itemsRouter.put("/update_item/:item_id", update_item as unknown as RequestHandler);
itemsRouter.delete("/delete_item/:item_id", delete_item as unknown as RequestHandler);

export default itemsRouter;



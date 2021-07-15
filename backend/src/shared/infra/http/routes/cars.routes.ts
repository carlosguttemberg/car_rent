import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAmin,
  createCarController.handle
);

export { carsRoutes };

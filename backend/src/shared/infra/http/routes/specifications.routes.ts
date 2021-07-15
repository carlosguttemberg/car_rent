import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAmin,
  createSpecificationController.handle
);

export { specificationsRoutes };

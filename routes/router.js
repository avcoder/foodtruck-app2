import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
export const router = Router();

router.get("/", truckController.homePage);
router.get("/add", truckController.addTruck);
router.post("/add", catchErrors(truckController.createTruck));

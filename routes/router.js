import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
export const router = Router();

router.get("/", catchErrors(truckController.homePage));

// TRUCKS
router.get("/trucks", catchErrors(truckController.getTrucks));
router.get("/trucks/:id/edit", catchErrors(truckController.editTruck));

// ADD TRUCK
router.get("/add", truckController.addTruck);
router.post("/add", catchErrors(truckController.createTruck));

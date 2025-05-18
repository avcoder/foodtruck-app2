import { Router } from "express";
import truckController from "../controllers/truckController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
export const router = Router();

router.get("/", catchErrors(truckController.homePage));

// TRUCKS
router.get("/trucks", catchErrors(truckController.getTrucks));

// ADD TRUCK
router.get("/add", truckController.addTruck);
router.post("/add", 
    truckController.upload,
    catchErrors(truckController.resize),
    catchErrors(truckController.createTruck)
);

// EDIT TRUCK
router.get("/trucks/:id/edit", truckController.editTruck);
router.post("/trucks/:id/edit", 
    truckController.upload,
    catchErrors(truckController.resize),
    catchErrors(truckController.updateTruck)
);

router.get("/foodtruck/:slug", catchErrors(truckController.getTruckBySlug));
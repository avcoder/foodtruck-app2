import { Router } from "express";
import truckController from "../controllers/truckController.js";

export const router = Router();

router.get("/", truckController.homePage);
router.get("/add", truckController.addTruck);
router.post("/add", truckController.createTruck);

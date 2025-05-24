import { Router } from "express";
import truckController from "../controllers/truckController.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
export const router = Router();

router.get("/", catchErrors(truckController.homePage));

// TRUCKS
router.get("/trucks", catchErrors(truckController.getTrucks));

// ADD TRUCK
router.get("/add", truckController.addTruck);
router.post(
  "/add",
  truckController.upload,
  catchErrors(truckController.resize),
  catchErrors(truckController.createTruck)
);

// EDIT TRUCK
router.get("/trucks/:id/edit", catchErrors(truckController.editTruck));
router.post(
  "/trucks/:id/edit",
  truckController.upload,
  catchErrors(truckController.resize),
  catchErrors(truckController.updateTruck)
);

// DELETE TRUCK
router.delete("/trucks/:id", truckController.deleteTruck);

// FOODTRUCK
router.get("/foodtruck/:slug", catchErrors(truckController.getTruckBySlug));

// TAGS
router.get("/tags", catchErrors(truckController.getStoresByTag));
router.get("/tags/:tag", catchErrors(truckController.getStoresByTag));

// LOGIN & REGISTER
router.get("/login", userController.loginForm);
router.post("/login", catchErrors(authController.login));
router.get("/reset-password", userController.resetPassword);
router.get("/register", userController.registerForm);
router.post(
  "/register",
  userController.validateRegister,
  userController.register
);

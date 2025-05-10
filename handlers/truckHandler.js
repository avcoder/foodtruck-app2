import Truck from "../models/truckModel.js";

const getAllTrucks = async () => {
  return await Truck.find().lean();
};

const createTruck = async (truckData) => {
  // console.log("Truck data in handler:", truckData);
  return await Truck.create(truckData);
};

export default {
  getAllTrucks,
  createTruck,
};

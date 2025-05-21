import Truck from "../models/truckModel.js";

const getAllTrucks = async (filters = {}) => {
  return await Truck.find(filters).lean();
};

const createTruck = async (truckData) => {
  // console.log("Truck data in handler:", truckData);
  return await Truck.create(truckData);
};

const getOneTruckById = async ({ id }) => {
  return await Truck.findOne({ _id: id }).lean();
};

const getOneTruckBySlug = async ({ slug }) => {
  return await Truck.findOne({ slug }).lean();
};

const updateTruck = async (id, truckData) => {
  return await Truck.findOneAndUpdate({ _id: id }, truckData, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteTruck = async (id) => {
  return await Truck.findByIdAndDelete(id).lean();
};

const getAllTags = async () => {
  return await Truck.getAllTags();
};

export default {
  getAllTrucks,
  createTruck,
  getOneTruckById,
  updateTruck,
  getOneTruckBySlug,
  deleteTruck,
  getAllTags,
};

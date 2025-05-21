import truckHandler from "../handlers/truckHandler.js";
import multer from "multer";
import { Jimp } from "jimp";
import { v4 as uuidv4 } from "uuid";

// need to specify where uploads go, and what file types are allowed
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith("image/");

    if (isPhoto) {
      next(null, true); // it's fine continue on, no error here
    } else {
      next({ message: "⚡ That file type isn't allowed!" }, false);
    }
  },
};

// store photo in memory of server
const upload = multer(multerOptions).single("photo");

const resize = async (req, res, next) => {
  // check if there no is a file to resize
  if (!req.file) {
    return next(); // skip to the next middleware
  }
  // console.log(req.file);
  const extension = req.file.mimetype.split("/")[1]; // get the file extension
  req.body.photo = `${uuidv4()}.${extension}`; // create a unique filename

  // resize the image
  const photo = await Jimp.read(req.file.buffer);
  if (photo.bitmap.width > 400) {
    await photo.resize(400, Jimp.AUTO); // width x height
  }
  await photo.write(`./public/uploads/${req.body.photo}`); // save the image to disk
  next(); // continue on to the next middleware
};

const homePage = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("home", { title: "Welcome to FoodTruck Empire", trucks });
};

const CHOICES = [
  "Cash only",
  "Debit only",
  "Online ordering",
  "Corporate lunches",
  "Vegetarian",
];

const addTruck = async (req, res) => {
  res.render("addTruck", {
    title: "Add Store",
    choices: CHOICES,
  });
};

const editTruck = async (req, res) => {
  // 1. Find the store given the ID
  // 2. Confirm they are owner of truck
  // 3. Render out the edit form so user can update their truck
  const truck = await truckHandler.getOneTruckById({ id: req.params.id });
  res.render("editTruck", {
    title: `Edit ${truck.name}`,
    truck,
    tags: truck.tags,
    choices: CHOICES,
  });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  const truck = await truckHandler.createTruck(truckData);
  req.flash(
    "success",
    `<a href="/foodtruck/${truck.slug}">${truck.name} added successfully!</a>`
  );
  // res.redirect(`/foodtruck/${truck.slug}`);
  res.redirect("/");
};

const getTrucks = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("trucks", { title: "All Trucks", trucks });
};

const updateTruck = async (req, res) => {
  req.body.location.type = "Point"; // set the location type to Point
  const id = req.params.id;
  const truckData = req.body;
  const truck = await truckHandler.updateTruck(id, truckData);
  req.flash(
    "success",
    `<a href="/foodtruck/${truck.slug}">${truck.name} updated successfully!</a>`
  );
  res.redirect(`/trucks/${truck._id}/edit`);
};

const getTruckBySlug = async (req, res, next) => {
  const truck = await truckHandler.getOneTruckBySlug({ slug: req.params.slug });
  if (!truck) return next();

  res.render("foodtruck", { title: `${truck.name}`, truck });
};

const getTags = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  // const tags = await truckHandler.getAllTags();
  res.render("tags", { title: "Tags", trucks });
};

const deleteTruck = async (req, res) => {
  const id = req.params.id;
  const truck = await truckHandler.deleteTruck(id);
  req.flash("success", `${truck.name} was deleted</a>`);
  res.redirect("/");
};

export default {
  homePage,
  addTruck,
  editTruck,
  createTruck,
  getTrucks,
  updateTruck,
  upload,
  resize,
  getTruckBySlug,
  getTags,
  deleteTruck,
};

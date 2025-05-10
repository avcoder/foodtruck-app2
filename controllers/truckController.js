import truckHandler from "../handlers/truckHandler.js";

const homePage = (req, res) => {
  res.render("home", { title: "🌮 Welcome to Taco Food Truck! 🚚" });
};

const addTruck = (req, res) => {
  res.render("addTruck", { title: "Add Store" });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  const truck = await truckHandler.createTruck(truckData);
  req.flash("success", `/${truck.slug} added successfully!`);
  res.redirect(`/foodtruck/${truck.slug}`);
};

export default {
  homePage,
  addTruck,
  createTruck,
};

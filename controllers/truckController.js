import truckHandler from "../handlers/truckHandler.js";

const homePage = (req, res) => {
  res.render("home", { title: "Welcome to FoodTrucks!" });
};

const addTruck = (req, res) => {
  res.render("addTruck", {
    title: "Add Store",
    choices: [
      "Cash only",
      "Debit only",
      "Online ordering",
      "Corporate lunches",
      "Vegetarian",
    ],
  });
};

const createTruck = async (req, res) => {
  const truckData = req.body;
  const truck = await truckHandler.createTruck(truckData);
  req.flash("success", `/${truck.slug} added successfully!`);
  res.redirect(`/foodtruck/${truck.slug}`);
};

const getTrucks = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("trucks", { title: "All Trucks", trucks });
};

export default {
  homePage,
  addTruck,
  createTruck,
  getTrucks,
};

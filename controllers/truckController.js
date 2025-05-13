import truckHandler from "../handlers/truckHandler.js";

const homePage = async (req, res) => {
  const trucks = await truckHandler.getAllTrucks();
  res.render("home", { title: "Welcome to FoodTruck Empire", trucks });
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

const editTruck = async (req, res) => {
  // 1. Find the store given the ID
  // 2. Confirm they are owner of truck
  // 3. Render out the edit form so user can update their truck
  const truck = await truckHandler.getOneTruck({ id: req.params.id });
  res.render("editTruck", {
    title: `Edit ${truck.name}`,
    truck,
    tags: truck.tags,
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

const updateTruck = async (req, res) => {
  const id = req.params.id;
  const truckData = req.body;
  const truck = await truckHandler.updateTruck(id, truckData);
  req.flash("success", `<a href="/trucks/${truck.slug}">${truck.name} updated successfully!</a>`);
  res.redirect(`/trucks/${truck._id}/edit`);
}

export default {
  homePage,
  addTruck,
  editTruck,
  createTruck,
  getTrucks,
  updateTruck
};

const homePage = (req, res) => {
  res.render("home", { title: "🌮 Welcome to Taco Food Truck! 🚚" });
};

const addTruck = (req, res) => {
  res.render("addTruck", { title: "Add Store" });
};

const createTruck = (req, res) => {
  console.log("in createTruck");
  res.json(req.body);
};

export default {
  homePage,
  addTruck,
  createTruck,
};

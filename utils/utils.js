import fs from "fs";
import * as datefns from "date-fns"; // library that displays dates nicely

// handy to console log when debugging
const dump = (obj) => JSON.stringify(obj, null, 2);
const staticMap = ([lat, lng]) => `${lat},${lng}`;

// insert svg icon
const icon = (iconName) => fs.readFileSync(`./public/icons/${iconName}.svg`);
const siteName = `Food Truck Flavours!`;

const menu = [
  {
    slug: "/trucks",
    title: "Trucks",
    icon: "truck",
  },
  {
    slug: "/tags",
    title: "Tags",
    icon: "tag",
  },
  {
    slug: "/top",
    title: "Top",
    icon: "top",
  },
  {
    slug: "/add",
    title: "Add",
    icon: "add",
  },
  {
    slug: "/map",
    title: "Map",
    icon: "map",
  },
];

export default {
  datefns,
  dump,
  staticMap,
  icon,
  siteName,
  menu,
};

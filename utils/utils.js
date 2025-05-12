import fs from "fs";
import * as datefns from "date-fns"; // library that displays dates nicely

// handy to console log when debugging
const dump = (obj) => {
  if (Object.keys(obj).length === 0) {
    console.log("Empty object");
    return;
  }
  return JSON.stringify(obj, null, 2);
};

const embedMap = ([lat, lng]) => `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

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
    icon: "award",
  },
  {
    slug: "/add",
    title: "Add",
    icon: "plus-circle",
  },
  {
    slug: "/map",
    title: "Map",
    icon: "map-pin",
  },
];

export default {
  datefns,
  dump,
  embedMap,
  icon,
  siteName,
  menu,
};

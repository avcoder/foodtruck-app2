import mongoose from "mongoose";
import GithubSlugger from "github-slugger";
import { type } from "os";

const slugger = new GithubSlugger();

const truckSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "truck name is required"],
  },
  slug: String,
  description: {
    type: String,
    trim: true,
    maxlength: [100, "description is too long"],
  },
  tags: [String],

  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [{
      type: Number,
      required: [true, "latitude and/or longitude are required"],
    }],
    address: {
      type: String,
      required: [true, "address is required"],
    },
  },
  photo: String,
} , { timestamps: true });

truckSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  // TODO: ensure slugs are unique
  this.slug = slugger.slug(this.name);
  next();
});

export default mongoose.model("Truck", truckSchema);

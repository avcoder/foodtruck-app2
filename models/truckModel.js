import mongoose from "mongoose";
import GithubSlugger from "github-slugger";

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
  created: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
    timestamp: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
  },
});

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

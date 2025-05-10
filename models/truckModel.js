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
  },
  tags: [String],
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

export default mongoose.model("truck", truckSchema);

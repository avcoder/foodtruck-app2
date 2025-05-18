import dotenv from "dotenv";
dotenv.config();
import { connect } from "./connect.js";

// TODO: import all models here
import "./models/userModel.js";
import "./models/truckModel.js";

// Connect to MongoDB
try {
  await connect(process.env.DB_CONN);

  const { app } = await import("./app.js");

  // Start app
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error("⚠️ Error:", error);
}

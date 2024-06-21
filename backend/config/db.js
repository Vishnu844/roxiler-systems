const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE ||
        "mongodb+srv://vishnudesu:1piWX07zM4Kw30jw@cluster1.ytycgif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

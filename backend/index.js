const express = require("express");
const connectDB = require("./config/db");
const Transaction = require("./models/Transaction.js");
const transactionRoute = require("./routes/transactionRoute.js");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Initializing database with transaction data.
const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const getDocumentCount = async () => {
  const documentCount = await Transaction.estimatedDocumentCount();
  return documentCount;
};

// Populating collection with data, only if collection is empty
getDocumentCount()
  .then(
    (res) =>
      res == 0 &&
      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          Transaction.insertMany(data);
        })
        .catch((err) => {
          console.log(err);
        })
  )
  .catch((err) => {
    console.log(err);
  });

// Using the transaction route
app.use("/api", transactionRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
